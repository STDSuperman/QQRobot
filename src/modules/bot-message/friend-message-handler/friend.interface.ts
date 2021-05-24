import {
	MessageType,
	MessageChain
} from '@modules/bot-message/interface/message.interface';

export interface FriendMessage {
	type: MessageType.FriendMessage;
	messageChain: MessageChain;
	sender: FriendMessageSender;
}

export interface FriendMessageSender {
	id: number;
	nickname: string;
	remark: string;
}
