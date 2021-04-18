import { Injectable } from '@nestjs/common'
import { MemberInfo } from '@src/user/user.interface';
import { UserService } from '@src/user/user.service'
import { ConfigService } from '@src/config/config.service';
import {
    GroupChatMessage,
    Group
} from '@src/bot-message/group-message-handler/interface/chat.interface';
import { FriendMessage } from '@src/bot-message/friend-message-handler/friend.interface'
import { MessageChainItemType } from '@src/bot-message/interface/message.interface'
import { BotSendService } from '@src/bot-send/send.service';
import { SendFriendMessage } from '@src/bot-send/interface/send.interface'

@Injectable()
export class CommonService {
    private connectionGroupList: Array<number> = [];
    private cacheOtherConnectionGroup = {};

    constructor(
        private readonly botSendService: BotSendService,
        private userService: UserService,
        private configService: ConfigService
    ) {
        this.connectionGroupList = this.configService.get('CONNECTION_GROUP_LIST');
    }

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
                (item.type === MessageChainItemType.At)
            ) {
                if (item.target === this.configService.get('QQAccount')) {
                    isAtMine = true;
                } else {
                    otherAtMember.push(item.target);
                }
            }
            if (item.type === MessageChainItemType.Plain && item?.text?.includes(keyword)) {
                isMatchKeyword = true; 
            }
        });
        return {
            checkRes: isAtMine && isMatchKeyword,
            otherAtMember
        }
    }

    // 批量发送消息给设定的群列表
    async sendMessageToGroupList(message: GroupChatMessage, isIncludeCurrent = false): Promise<void> {
        const targetGroupList = isIncludeCurrent ? this.connectionGroupList : this.getOtherConnectionGroupList(message?.sender?.group?.id);
        targetGroupList.forEach(async id => {
            this.botSendService.sendGroupMessage({
                sessionKey: await this.configService.getRedisConfig('sessionKey'),
                target: id,
                messageChain: message.messageChain
            });
        })
    }

    // 判断当前群是否包含在设定的转发群内
    checkIsInConnectionGroup(group: Group): boolean {
        return this.connectionGroupList.includes(group?.id);
    }

    // 获取设定的转发群内其他群号
    getOtherConnectionGroupList(id: number): Array<number> {
        // 如果存在缓存则无需重新计算
        if (this.cacheOtherConnectionGroup[id]) return this.cacheOtherConnectionGroup[id];
        const result = this.connectionGroupList.reduce((pre: Array<number>, cur: number) => {
            return pre.concat(cur === id ? [] : cur)
        }, [])
        this.cacheOtherConnectionGroup[id] = result;
        return result;
    }

    async sendFriendMessage(message: FriendMessage, text: string) {
        const sendFriendMessagePayload: SendFriendMessage = {
            sessionKey: await this.configService.getRedisConfig('sessionKey'),
            target: message.sender.id,
            messageChain: [
                { type: MessageChainItemType.Plain, text }
            ]
        }
        this.botSendService.sendFriendMessage(sendFriendMessagePayload);
    }
}