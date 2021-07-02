import { GroupChatMessage } from '@modules/bot-message/group-message-handler/interface/chat.interface';
import { FriendMessage } from '@modules/bot-message/friend-message-handler/friend.interface';

export interface IBotMessage {
	syncId: number;
	data: GroupChatMessage | FriendMessage;
}

export interface IActiveUserCountItem {
	activeUserCount: number;
}
