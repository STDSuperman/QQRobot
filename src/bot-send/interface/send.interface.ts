import { MessageChain } from '@/bot-message/interface/message.interface'

export interface SendGroupMessage {
    sessionKey: string;
    target: number;
    messageChain: MessageChain,
    quote?: number;
}

export interface SendFriendMessage {
    sessionKey: string;
    target: number;
    qq?: number;
    quote?: number;
    messageChain: MessageChain
}