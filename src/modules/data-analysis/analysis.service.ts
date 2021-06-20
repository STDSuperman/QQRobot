import { Injectable } from '@nestjs/common';
import {
	GroupChatMessage,
	Sender
} from '@modules/bot-message/group-message-handler/interface/chat.interface';

@Injectable()
export class GroupAnalysisService {
	handler(message: GroupChatMessage) {
		this.saveMessageInfo(message);
	}

	saveMessageInfo(message: GroupChatMessage) {
		const sender: Sender = message.sender;
		const data = {
			sendTimestamp: sender.lastSpeakTimestamp,
			groupName: sender.group.name,
			groupId: sender.group.id,
			permission: sender.permission,
			memberName: sender.memberName,
			memberId: sender.id
		};
	}
}
