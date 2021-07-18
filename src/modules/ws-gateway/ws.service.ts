import { Injectable } from '@nestjs/common';
import { GroupAnalysisService } from '@modules/data-analysis/analysis.service';
import { IActiveUserCountItem } from '@modules/ws-gateway/ws.interface';
import { debounceTime } from '@utils/index';

@Injectable()
export class WsService {
	constructor(private groupAnalysisService: GroupAnalysisService) {}

	async getDataBoardData() {
		const allChatMsg = await this.groupAnalysisService.findMessageListByDate();
		const activeUserCountList: IActiveUserCountItem[] = await this.groupAnalysisService.getSendMessageUserCountByDate();
		return {
			todayChatMsgCount: allChatMsg.length,
			activeUserCount: activeUserCountList[0].activeUserCount
		};
	}
}
