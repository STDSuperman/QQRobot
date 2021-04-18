/**
 * 主要处理群聊消息，并转发到其他需要连接的群
 */

import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@src/config/config.service';
import { CommonService } from '@src/bot-message/common-module/common.service'
import { VoteKickService } from './vote.service'
import { TianXingMessageService } from '@src/bot-message/tianxing.service'
import {
    GroupChatMessage,
    Sender,
} from './interface/chat.interface';
import { 
    MessageChainItemType,
    MessageChainItemPlain,
    MessageChainItem,
    MessageChain
} from '@src/bot-message/interface/message.interface'

@Injectable()
export class GroupMessageHandlerService {
    private permissionShowMap: object = {
        OWNER: '群主',
        MEMBER: '群员',
        ADMINISTRATOR: '管理员'
    };
    private connectionGroupList: Array<number> = [];
    private messageHandlerMap: {} // 不同消息关键字触发的逻辑

    constructor(
        private configService: ConfigService,
        private voteKickService: VoteKickService,
        private commonService: CommonService,
        private tianXingMessageService: TianXingMessageService
    ) {
        this.connectionGroupList = this.configService.get('CONNECTION_GROUP_LIST');
        this.messageHandlerMap = {
            voteKickType: this.voteKickService.handler,
            tianXingType: this.tianXingMessageService.handler
        };
    }

    @OnEvent('bot.message.group')
    handleGroupMessage(message: GroupChatMessage) {
        this.handleGroupChatMessage(message);
    }

    // 处理群消息
    async handleGroupChatMessage(message: GroupChatMessage): Promise<void> {
        this.forwardGroupMessage(message);
        this.messageChainResolve(message);
    }

    // 解析用户消息关键词
    async messageChainResolve(message: GroupChatMessage) {
        Object.keys(this.messageHandlerMap)?.forEach(key => {
            this.messageHandlerMap[key](message);
        })
    }

    // 用于将本群消息转发给其他群，提供跨群聊天能力
    async forwardGroupMessage(message: GroupChatMessage): Promise<void> {
        const senderInfo: MessageChainItem = {
            type: MessageChainItemType.Plain,
            // text:  `${message.sender.memberName}（来源：${message.sender.group.name}）\n------------------------------------\n`，
            text: this.getSenderInfoText(message.sender)
        }
        
        // 由于是多个群转发消息，所以回复和@不支持
        message.messageChain = await this.transformMessageChain(message);
        message.messageChain.unshift(senderInfo);
        if (this.commonService.checkIsInConnectionGroup(message?.sender?.group)) {
            this.commonService.sendMessageToGroupList(message, false);
        }
    }

    // 获取标识用户信息相关文案
    getSenderInfoText(sender: Sender) {
        const roomId = sender.group.id;
        const identity = this.permissionShowMap[sender.permission];
        const senderName = sender.memberName;
        return `『  ${senderName}（${identity}➻${this.connectionGroupList.indexOf(roomId) + 1}群）』：`;
    }

    // 转换转发消息无法正确识别的内容
    async transformMessageChain(message: GroupChatMessage): Promise<MessageChain> {
        const messageChain = message.messageChain;
        let result: MessageChain = [];
        while(messageChain.length) {
            let item = messageChain.shift();
            if (item.type === MessageChainItemType.Quote) continue;
            if (
                item.type === MessageChainItemType.At
            ) {
                (item as unknown as MessageChainItemPlain) = {
                    type: MessageChainItemType.Plain,
                    text: `@${
                        (await this.commonService.getUserInfo(
                            (item as any)?.targetId || item?.target,
                            message?.sender?.group.id)
                        )
                        ?.name || '未知用户'
                    }`
                }
            }
            result.push(item);
        }
        return result;
    }
}