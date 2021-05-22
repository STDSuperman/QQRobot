import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from '@/modules/logger/logger.controller';
import DbModule from '@/modules/db/db.module';

@Module({
    imports: [DbModule],
    providers: [LoggerService],
    controllers: [LoggerController],
    exports: [LoggerService]
})
export default class ConfigModule {}