import { Injectable } from '@nestjs/common';
import {
	GroupChatMessage,
	Sender
} from '@modules/bot-message/group-message-handler/interface/chat.interface';
import { MysqlDBService } from '@modules/db/db.service';

@Injectable()
export class GroupAnalysisService {
	constructor(private mysqlDB: MysqlDBService) {}

	handler(message: GroupChatMessage) {
		this.saveMessageInfo(message);
	}

	async saveMessageInfo(message: GroupChatMessage) {
		const sender: Sender = message.sender;
		const data = {
			sendTimestamp: sender.lastSpeakTimestamp,
			groupName: sender.group.name,
			groupId: sender.group.id,
			permission: sender.permission,
			memberName: sender.memberName,
			memberId: sender.id
		};
		return this.mysqlDB.createGroupChatMessage(data);
	}

	async findMessageListByDate(date) {
		return this.mysqlDB.findMessageListByDate(date);
	}
}
