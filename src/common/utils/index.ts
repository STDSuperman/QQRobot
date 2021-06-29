import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { EnvConfig } from '@/modules/config/config.interface';
import * as crypto from 'crypto';

type numberWString = number | string;

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

export function formatDateToYMD(
	date: Date,
	split: string,
	hasTime: boolean,
	strict: boolean,
	hasYear: boolean
): string {
	split = split === undefined ? '/' : split;
	strict = strict !== undefined;
	const year = date.getFullYear();
	let month: numberWString = date.getMonth() + 1;
	let day: numberWString = date.getDate();
	if (strict) {
		month = month < 10 ? `0${month}` : month.toString();
		day = day < 10 ? `0${day}` : day.toString();
	}
	if (hasTime) {
		let hour: numberWString = date.getHours();
		let min: numberWString = date.getMinutes();
		if (strict) {
			hour = hour < 10 ? `0${hour}` : hour.toString();
			min = min < 10 ? `0${min}` : min.toString();
		}
		return (
			(hasYear ? year + split : '') +
			month +
			split +
			day +
			' ' +
			hour +
			':' +
			min
		);
	} else {
		return (hasYear ? year + split : '') + month + split + day;
	}
}
