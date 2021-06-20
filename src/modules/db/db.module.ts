import { Module } from '@nestjs/common';
import { LowDbService, MysqlDBService } from './db.service';

@Module({
	providers: [LowDbService, MysqlDBService],
	exports: [LowDbService, MysqlDBService]
})
export default class DbModule {}
