import { Injectable } from '@nestjs/common';
import {
	GroupChatMessage,
	Sender
} from '@modules/bot-message/group-message-handler/interface/chat.interface';
import { MysqlDBService } from '@modules/db/db.service';
import { formatDateToYMD } from '@/common/utils';
import { IDateString } from '@modules/data-analysis/analysis.interface';

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

	formatDate2StartEnd(date: IDateString) {
		if (date instanceof Date) {
			date = formatDateToYMD(date, '-', false, true, true);
		}
		const startTime = new Date(`${date} 00:00:00`).getTime() / 1000;
		const endTime = new Date(`${date} 23:59:59`).getTime() / 1000;
		return [startTime, endTime];
	}

	async findMessageListByDate(date: IDateString = new Date()) {
		const [startTime, endTime] = this.formatDate2StartEnd(date);
		return this.mysqlDB.findMessageListByDate(startTime, endTime);
	}

	async getSendMessageUserCountByDate(date = new Date()) {
		const [startTime, endTime] = this.formatDate2StartEnd(date);
		return this.mysqlDB.getSendMessageUserCountByDate(startTime, endTime);
	}
}
