import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GroupChatMessage } from './group-message-handler/interface/chat.interface';
import { MessageType } from './interface/message.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FriendMessage } from './friend-message-handler/friend.interface';

@Injectable()
export class BotMessageService {
	constructor(private eventEmitter: EventEmitter2) {}

	@OnEvent('bot.message')
	handleBotMessage(message: any = {}): void {
		switch (message.type) {
			case MessageType.GroupMessage:
				this.eventEmitter.emit(
					'bot.message.group',
					message as GroupChatMessage
				);
				break;
			case MessageType.FriendMessage:
				this.eventEmitter.emit(
					'bot.message.friend',
					message as FriendMessage
				);
				break;
			default:
				break;
		}
	}
}
