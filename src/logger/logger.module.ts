import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigService } from '@/config/config.service';

@Module({
    providers: [LoggerService],
    exports: [LoggerService]
})
export default class ConfigModule {}