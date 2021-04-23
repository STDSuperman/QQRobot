import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import RedisCacheModule from '@/redis-cache/cache.module';
import LoggerModule from '@/logger/logger.module';

@Global()
@Module({
    imports: [RedisCacheModule, LoggerModule],
    providers: [ConfigService],
    exports: [ConfigService, LoggerModule]
})
export default class ConfigModule {}