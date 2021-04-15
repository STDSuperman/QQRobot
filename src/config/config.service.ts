import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { GlobalConfig } from './config.interface'
import UserConfig from '../../config'
import { CacheService } from '@src/redis-cache/cache.service'

@Injectable()
export class ConfigService{
    private globalConfig: GlobalConfig;
    private envPath: string = path.resolve(__dirname, '../.env')

    constructor(
        private readonly redisCacheService: CacheService
    ) {
        let envConfig: unknown = {};
        if (fs.existsSync(this.envPath)) {
            envConfig = dotenv.parse(fs.readFileSync(this.envPath)) || {};
        }
        this.globalConfig = Object.assign({}, UserConfig, envConfig as GlobalConfig);
    }

    get<K extends keyof GlobalConfig>(key: K) {
        return this.globalConfig[key];
    }

    set(key: string, value: any): void {
        this.globalConfig[key] = value;
    }

    async getRedisConfig(key) {
        return await this.redisCacheService.get(key);
    }
    
    async setRedisConfig(key: any, value: any): Promise<void> {
        await this.redisCacheService.set(key, value)
    }
}