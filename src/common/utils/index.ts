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

export function debounceTime(
	fn: () => void,
	delay: number,
	immediate?: boolean
) {
	let timer = null;
	return (...args) => {
		if (timer) clearTimeout(timer);
		if (immediate) {
			const callTime = !timer;
			setTimeout(() => (timer = null), delay);
			callTime && fn.apply(this, args);
		} else {
			timer = setTimeout(() => fn.apply(this, args), delay);
		}
	};
}

export function rewriteGlobalMethod() {
	const originJsonStringify = JSON.stringify;
	JSON.stringify = (val: any) => {
		return originJsonStringify(val, (key, val) =>
			typeof val === 'bigint' ? val.toString : val
		);
	};
}
