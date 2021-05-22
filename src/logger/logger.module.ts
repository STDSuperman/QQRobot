import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from '@/logger/logger.controller';
import DbModule from '@/db/db.module';

@Module({
    imports: [DbModule],
    providers: [LoggerService],
    controllers: [LoggerController],
    exports: [LoggerService]
})
export default class ConfigModule {}