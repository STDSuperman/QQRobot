import { Controller, Get, Query } from '@nestjs/common';
import { GroupAnalysisService } from '@modules/data-analysis/analysis.service';
import { ConfigService } from '@modules/config/config.service';

@Controller('analysis')
export class AnalysisController {
	constructor(
		private groupAnalysisService: GroupAnalysisService,
		private configService: ConfigService
	) {}

	@Get('/list')
	async getSpeakDataList(@Query('date') date: string) {
		return this.groupAnalysisService.findMessageListByDate(date);
	}

	@Get('/all/list')
	async getAllDataList() {
		return (
			JSON.parse(
				await this.configService.getRedisConfig('sendUserMsgData')
			) || {
				total: 0,
				dateMap: {}
			}
		);
	}
}
