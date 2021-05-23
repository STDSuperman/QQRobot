import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { GlobalConfig, EnvConfig } from './config.interface';
import UserConfig from '../../config';
import { CacheService } from '@modules/redis-cache/cache.service';
import { getEnvConfig } from '@/common/utils/index';

@Injectable()
export class ConfigService {
	private globalConfig: GlobalConfig & EnvConfig;
	private envPath: string = path.resolve(process.cwd(), '.env');

	constructor(private readonly redisCacheService: CacheService) {
		const envConfig: EnvConfig = getEnvConfig(this.envPath);
		const BOT_BASE_URL = `http://${envConfig.SERVER_HOST}:${UserConfig.BOT_SERVER_PORT}`;
		this.globalConfig = Object.assign(
			{},
			UserConfig,
			envConfig as EnvConfig,
			{
				BOT_BASE_URL,
				BotHttpConfig: {
					...UserConfig.BotHttpConfig,
					baseURL: BOT_BASE_URL,
				},
			},
		) as GlobalConfig & EnvConfig;
	}

	get<K extends keyof (GlobalConfig & EnvConfig)>(key: K) {
		return this.globalConfig[key];
	}

	set(key: string, value: any): void {
		this.globalConfig[key] = value;
	}

	async getRedisConfig(key) {
		return this.redisCacheService.get(key);
	}

	async setRedisConfig(key: any, value: any): Promise<void> {
		await this.redisCacheService.set(key, value);
	}
}
