import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';
import * as path from 'path';
import { EnvConfig } from '@modules/config/config.interface';
import UserConfig from '../../config';
import { getEnvConfig } from '@/common/utils/index';

const envConfig: EnvConfig = getEnvConfig(path.resolve(process.cwd(), '.env'));
@Module({
	imports: [
		CacheModule.registerAsync({
			useFactory: async () => ({
				store: redisStore,
				host: envConfig.SERVER_HOST,
				port: UserConfig.REDIS_PORT,
				ttl: UserConfig.CACHE_TTL,
			}),
		}),
	],
	providers: [CacheService],
	exports: [CacheService],
})
export default class RedisCacheModule {}
