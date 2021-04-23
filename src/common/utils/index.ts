import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { EnvConfig } from '@/config/config.interface'

export function getEnvConfig(path): EnvConfig {
    let envConfig: EnvConfig = {};
    if (fs.existsSync(path)) {
        envConfig = dotenv.parse(fs.readFileSync(path)) || {} as EnvConfig;
    }
    return envConfig;
}