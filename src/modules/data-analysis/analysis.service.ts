import { Injectable } from '@nestjs/common';
import {
	GroupChatMessage,
	Sender
} from '@modules/bot-message/group-message-handler/interface/chat.interface';
import { MysqlDBService } from '@modules/db/db.service';
import { formatDateToYMD } from '@/common/utils';
import { IDateString } from '@modules/data-analysis/analysis.interface';
import { ConfigService } from '@modules/config/config.service';

@Injectable()
export class GroupAnalysisService {
	constructor(
		private mysqlDB: MysqlDBService,
		private configService: ConfigService
	) {}

	handler(message: GroupChatMessage) {
		this.saveMessageInfo(message);
	}

	async saveMessageInfo(message: GroupChatMessage) {
		const sender: Sender = message.sender;
		const data: GroupSendMessageInfo = {
			sendTimestamp: new Date(sender.lastSpeakTimestamp * 1000),
			groupName: sender.group.name,
			groupId: sender.group.id,
			permission: sender.permission,
			memberName: sender.memberName,
			memberId: sender.id
		};
		return this.mysqlDB.createGroupChatMessage(data);
	}

	formatDate2StartEnd(date: IDateString): [string, string] {
		if (date instanceof Date) {
			date = formatDateToYMD(date, '-', false, true, true);
		}
		const startTime = `${date} 00:00:00`;
		const endTime = `${date} 23:59:59`;
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

	async parseDataList() {
		let result = await this.configService.getRedisConfig('sendUserMsgData');
		if (result) return result;
		const list = await this.mysqlDB.findAllMessageList();
		const dateMap: Record<string, GroupSendMessageInfo[]> = {};
		list.forEach((item: GroupSendMessageInfo) => {
			if (!dateMap[item.memberId]) dateMap[item.memberId] = [];
			dateMap[item.memberId].push(item);
		});
		result = {
			total: list.length,
			dateMap
		};
		this.configService.setRedisConfig('sendUserMsgData', result);
		return result;
	}
}
