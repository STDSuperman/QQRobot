import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from '@/logger/logger.controller'

@Module({
    providers: [LoggerService],
    controllers: [LoggerController],
    exports: [LoggerService]
})
export default class ConfigModule {}