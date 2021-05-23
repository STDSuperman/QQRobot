/**
 * 群聊天消息部分
 * 类型太多了，完整的还是看官方文档吧
 * */

import {
	MessageType,
	MessageChain,
} from '@modules/bot-message/interface/message.interface';

export enum MemberPermission {
	OWNER = 'OWNER',
	ADMINISTRATOR = 'ADMINISTRATOR',
	MEMBER = 'MEMBER',
}
export interface Group {
	id: number;
	name: string;
	permission: keyof MemberPermission;
}

export interface Sender {
	id: number;
	memberName?: string;
	permission?: keyof MemberPermission;
	group: Group;
}

export interface GroupChatMessage {
	type: keyof MessageType;
	messageChain: MessageChain;
	sender: Sender;
}
