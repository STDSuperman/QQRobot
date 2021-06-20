import { Module } from '@nestjs/common';
import { GroupAnalysisService } from '@modules/data-analysis/analysis.service';
@Module({
	providers: [GroupAnalysisService],
	exports: [GroupAnalysisService]
})
export default class AnalysisModule {}
