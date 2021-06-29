import { Injectable } from '@nestjs/common';
import { MysqlDBService } from '@modules/db/db.service';
@Injectable()
export class WsService {
	constructor(private mysqlDBService: MysqlDBService) {}

	async getDataBoardData() {
		const allChatMsg = await this.mysqlDBService.findMessageListByDate();
		return {
			todayChatMsgCount: allChatMsg.length
		};
	}
}
