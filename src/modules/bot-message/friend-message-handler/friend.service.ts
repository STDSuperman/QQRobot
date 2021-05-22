import { Injectable, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FriendMessage } from './friend.interface';
import { CommonService } from '@/modules/bot-message/common-module/common.service'
import { ConfigService } from '@/modules/config/config.service';
import { BotSendService } from '@/modules/bot-send/send.service';
import { TianXingMessageService } from '@/modules/bot-message/tianxing.service'

@Injectable()
export class FriendMessageService implements OnModuleInit {
    private administrators: Array<number> = [
        2750556766
    ];
    private messageHandlerMap = {
        tianXingType: this.tianXingMessageService.handler
    }

    constructor(
        private commonService: CommonService,
        private configService: ConfigService,
        private botService: BotSendService,
        private tianXingMessageService: TianXingMessageService
    ) {
        this.messageHandlerMap = {
            tianXingType: this.tianXingMessageService.handler
        };
    }

    onModuleInit() {
        this.configService.setRedisConfig('voteKickStatus', true); // 投票踢人默认开启
    }

    @OnEvent('bot.message.friend')
    friendMessage(message: FriendMessage) {
        this.handleFriendChatMessage(message);
    }

    handleFriendChatMessage(message: FriendMessage) {
        this.handlerVoteSwitch(message);
        this.messageChainResolve(message);
    }

    // 解析用户消息关键词
    async messageChainResolve(message: FriendMessage) {
        Object.keys(this.messageHandlerMap)?.forEach(key => {
            this.messageHandlerMap[key](message, true);
        })
    }

    async handlerVoteSwitch(message: FriendMessage) {
        const { checkRes } = this.commonService.checkAtRobotAndInclueKey(message, 'switchVoteKick', true);
        if (checkRes && this.checkOperationPermission(message.sender.id)) {
            this.configService.setRedisConfig('voteKickStatus', !await this.configService.getRedisConfig('voteKickStatus'));
            const currentVoteStatus = await this.configService.getRedisConfig('voteKickStatus')
            this.commonService.sendFriendMessage(message, `当前投票踢人功能状态：${currentVoteStatus ? '已开启' : '已关闭'}`);
        }
    }
    
    checkOperationPermission(id: number): boolean {
        return this.administrators.includes(id);
    }
}