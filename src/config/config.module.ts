import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import RedisCacheModule from '@/redis-cache/cache.module';
@Module({
    imports: [RedisCacheModule],
    providers: [ConfigService],
    exports: [ConfigService]
})
export default class ConfigModule {}