import { Module } from '@nestjs/common';
import { GroupAnalysisService } from '@modules/data-analysis/analysis.service';
import { MysqlDBService } from '@modules/db/db.service';
import { AnalysisController } from '@modules/data-analysis/analysis.controller';
@Module({
	providers: [GroupAnalysisService, MysqlDBService],
	exports: [GroupAnalysisService, MysqlDBService],
	controllers: [AnalysisController]
})
export default class AnalysisModule {}
