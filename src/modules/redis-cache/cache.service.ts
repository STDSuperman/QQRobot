import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

    async get(key: string) {
        return await this.cache.get(key);
    }

    async set(key: string, value: any): Promise<Boolean> {
        await this.cache.set(key, value);
        return true;
    }
}