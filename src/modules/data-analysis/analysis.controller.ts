import { Controller, Get, Query } from '@nestjs/common';
import { GroupAnalysisService } from '@modules/data-analysis/analysis.service';

@Controller('analysis')
export class AnalysisController {
	constructor(private groupAnalysisService: GroupAnalysisService) {}

	@Get('/list')
	async getSpeakDataList(@Query('date') date: string) {
		return this.groupAnalysisService.findMessageListByDate(date);
	}
}
