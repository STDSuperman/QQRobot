import { Injectable } from '@nestjs/common'
import { MemberInfo } from '@src/user/user.interface';
import { UserService } from '@src/user/user.service'
import { ConfigService } from '@src/config/config.service';
import {
    GroupChatMessage,
} from '@src/bot-message/group-message-handler/interface/chat.interface';
import { FriendMessage } from '@src/bot-message/friend-message-handler/friend.interface'
import { MessageChainItemType } from '@src/bot-message/interface/message.interface'

@Injectable()
export class CommonService {
    constructor(
        private userService: UserService,
        private configService: ConfigService
    ) {}

    // 获取用户信息
    async getUserInfo(memberId: number, groupId: number): Promise<MemberInfo> {
        if (!memberId) return {};
        return (await this.userService.getGroupMemberInfo(memberId, groupId));
    }

    // 判断是否艾特机器人并携带关键字
    checkAtRobotAndInclueKey(message: GroupChatMessage | FriendMessage, keyword: string, isFriendMessage: boolean = false) {
        // 如果是好友消息则无需艾特，直接置为true
        let isAtMine = isFriendMessage;
        let isMatchKeyword = false;
        let otherAtMember: Array<number> = [];
        message.messageChain.find((item) => {
            if (
                item.type === MessageChainItemType.At
            ) {
                if (item.target === this.configService.get('QQAccount')) {
                    isAtMine = true;
                } else {
                    otherAtMember.push(item.target);
                }
            }
            if (item.type === MessageChainItemType.Plain && item.text.includes(keyword)) {
                isMatchKeyword = true; 
            }
        });
        return {
            checkRes: isAtMine && isMatchKeyword,
            otherAtMember
        }
    }

}