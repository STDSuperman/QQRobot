import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service'
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { EnvConfig } from '@src/config/config.interface'
import UserConfig from '../../config'

const envConfig = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), '.env'))) || {} as EnvConfig;
@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: async () => ({
                store: redisStore,
                host: envConfig.SERVER_HOST,
                port: UserConfig.REDIS_PORT,
                ttl: UserConfig.CACHE_TTL
            })
        })
    ],
    providers: [CacheService],
    exports: [CacheService]
})
export default class RedisCacheModule{}