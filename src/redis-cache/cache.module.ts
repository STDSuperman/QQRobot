import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service'
import { ConfigService } from '@src/config/config.service';

@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get('SERVER_HOST'),
                port: configService.get('REDIS_PORT'),
                ttl: configService.get('CACHE_TTL')
            }),
            inject: [ConfigService]
        })
    ],
    providers: [CacheService],
    exports: [CacheService]
})
export default class RedisCacheModule{}