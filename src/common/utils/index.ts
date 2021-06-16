import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { EnvConfig } from '@/modules/config/config.interface';
import * as crypto from 'crypto';

export function getEnvConfig(path): EnvConfig {
	let envConfig: EnvConfig = {};
	if (fs.existsSync(path)) {
		envConfig = dotenv.parse(fs.readFileSync(path)) || ({} as EnvConfig);
	}
	return envConfig;
}

export function getHash(message: string) {
	const hash = crypto.createHash('md5');
	hash.update(message);
	return hash.digest('hex');
}
