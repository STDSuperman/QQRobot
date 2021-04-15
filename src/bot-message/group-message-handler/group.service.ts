/**
 * 主要处理群聊消息，并转发到其他需要连接的群
 */

import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter';
import { BotSendService } from '@src/bot-send/send.service';
import { ConfigService } from '@src/config/config.service';
import { CommonService } from '@src/bot-message/common.service'
import { VoteKickService } from './vote.service'
import { TianXingMessageService } from './tianxing.service'
import {
    GroupChatMessage,
    Group
} from './interface/chat.interface';
import { MessageChainItemType, MessageChainItemPlain, MessageChainItem, MessageChain } from '@src/bot-message/interface/message.interface'

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
        private readonly botSendService: BotSendService,
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
            text: `${message.sender.memberName}（${ this.permissionShowMap[message.sender.permission]}）：`
        }
        message.messageChain.unshift(senderInfo);
        // 由于是多个群转发消息，所以回复和@不支持
        // message.messageChain = await this.resolveMessageChain(message.messageChain, message);

        if (this.checkIsInConnectionGroup(message?.sender?.group)) {
            const otherGroupList = this.getOtherConnectionGroupList(message?.sender?.group?.id);
            otherGroupList.forEach(async id => {
                this.botSendService.sendGroupMessage({
                    sessionKey: await this.configService.getRedisConfig('sessionKey'),
                    target: id,
                    messageChain: message.messageChain
                });
            })
        }
    }
    // 解析当前消息内容
    async resolveMessageChain(messageChain: MessageChain, message: GroupChatMessage): Promise<MessageChain> {
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

    // 判断当前群是否包含在设定的转发群内
    checkIsInConnectionGroup(group: Group): boolean {
        return this.connectionGroupList.includes(group?.id);
    }
    // 获取设定的转发群内其他群号
    getOtherConnectionGroupList(id: number): Array<number> {
        return this.connectionGroupList.reduce((pre: Array<number>, cur: number) => {
            return pre.concat(cur === id ? [] : cur)
        }, [])
    }
}