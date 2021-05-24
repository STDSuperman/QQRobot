import { Module } from '@nestjs/common';
import { LowDbService } from './db.service';

@Module({
	providers: [LowDbService],
	exports: [LowDbService]
})
export default class DbModule {}
