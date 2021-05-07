import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import RedisCacheModule from '@/redis-cache/cache.module';
import LoggerModule from '@/logger/logger.module';
import { WsService } from '@/ws-gateway/ws.service'

@Global()
@Module({
    imports: [RedisCacheModule, LoggerModule],
    providers: [ConfigService, WsService],
    exports: [ConfigService, LoggerModule]
})
export default class ConfigModule {}