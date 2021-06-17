import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisConfig } from '@modules/config/config.interface';

@Injectable()
export class CacheService {
	constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

	async get<K extends keyof RedisConfig>(key: K): Promise<any> {
		return await this.cache.get(key as string);
	}

	async set(key: string, value: any, ttl: number): Promise<boolean> {
		await this.cache.set(key, value, {
			ttl
		});
		return true;
	}
}
