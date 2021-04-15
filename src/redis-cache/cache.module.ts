import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service'
import UserConfig from '../../config'

@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: async () => ({
                store: redisStore,
                host: UserConfig.REDIS_HOST,
                port: UserConfig.REDIS_PORT,
                ttl: UserConfig.CACHE_TTL
            })
        })
    ],
    providers: [CacheService],
    exports: [CacheService]
})
export default class RedisCacheModule{}