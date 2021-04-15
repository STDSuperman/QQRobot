import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import RedisCacheModule from '@src/redis-cache/cache.module'

@Global()
@Module({
    imports: [RedisCacheModule],
    providers: [ConfigService],
    exports: [ConfigService]
})
export default class ConfigModule {}