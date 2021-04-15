import { Injectable, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FriendMessage } from './friend.interface';
import { CommonService } from '@src/bot-message/common.service'
import { ConfigService } from '@src/config/config.service';
import { BotSendService } from '@src/bot-send/send.service';
import { SendFriendMessage } from '@src/bot-send/interface/send.interface'
import { MessageChainItemType } from '@src/bot-message/interface/message.interface'

@Injectable()
export class FriendMessageService implements OnModuleInit {
    private administrators: Array<number> = [
        2750556766
    ];

    constructor(
        private commonService: CommonService,
        private configService: ConfigService,
        private botService: BotSendService
    ) {}

    onModuleInit() {
        this.configService.setRedisConfig('voteKickStatus', true); // 投票踢人默认开启
    }

    @OnEvent('bot.message.friend')
    friendMessage(message: FriendMessage) {
        this.handleFriendChatMessage(message);
    }

    handleFriendChatMessage(message: FriendMessage) {
        this.handlerVoteSwitch(message);
    }

    async handlerVoteSwitch(message: FriendMessage) {
        const { checkRes } = this.commonService.checkAtRobotAndInclueKey(message, 'switchVoteKick', true);
        if (checkRes && this.checkOperationPermission(message.sender.id)) {
            this.configService.setRedisConfig('voteKickStatus', !await this.configService.getRedisConfig('voteKickStatus'));
            const currentVoteStatus = await this.configService.getRedisConfig('voteKickStatus')
            this.sendFriendMessage(message, `当前投票踢人功能状态：${currentVoteStatus ? '已开启' : '已关闭'}`);
        }
    }
    
    checkOperationPermission(id: number): boolean {
        return this.administrators.includes(id);
    }

    async sendFriendMessage(message: FriendMessage, text: string) {
        const sendFriendMessagePayload: SendFriendMessage = {
            sessionKey: await this.configService.getRedisConfig('sessionKey'),
            target: message.sender.id,
            messageChain: [
                { type: MessageChainItemType.Plain, text }
            ]
        }
        this.botService.sendFriendMessage(sendFriendMessagePayload);
    }
}