import { Injectable } from '@nestjs/common';
import * as low from 'lowdb';
import * as path from 'path';
import * as fs from 'fs';
import * as FileSync from 'lowdb/adapters/FileSync';
import { ESortType } from '@/modules/logger/logger.interface';
interface ErrorItem {
	lever: 'info' | 'warn' | 'error';
	message: string;
	timestamp: string;
}

export interface LowDBData {
	errorLogs: ErrorItem[];
}

export interface LowDBInstance {
	get: (string) => any;
	pushOne: (string, any) => any;
}

@Injectable()
export class LowDbService {
	private db;
	private dbDirectory = './database-file';
	private dbFile = path.resolve(
		process.cwd(),
		this.dbDirectory,
		'lowDB.json'
	);
	constructor() {
		this.init();
	}

	init() {
		this.checkDirectoryExist();
		const adapter = new FileSync(this.dbFile);
		this.db = low(adapter);
		this.db.read();
		this.db.defaults({ errorLogs: [] }).write();
	}

	checkDirectoryExist() {
		if (!fs.existsSync(this.dbDirectory)) {
			fs.mkdirSync(this.dbDirectory);
		}
	}

	getDBInstance() {
		return this.db;
	}

	pushOne(key: string, value: any) {
		this.db.get(key).push(value).write();
	}

	readAll<K extends keyof LowDBData>(key: K) {
		return this.db.get(key).value();
	}

	readRecentData<K extends keyof LowDBData>(
		key: K,
		num = 20,
		pageNum = 1,
		sortByKey = 'timestamp',
		sort = ESortType.descending
	) {
		let result = this.db.get(key).sortBy(sortByKey);

		if (sort === 2) result = result.reverse();
		return result
			.slice((pageNum - 1) * num, pageNum * num)
			.take(num)
			.value();
	}

	getDataSize(key: string) {
		return this.db.get(key).size().value();
	}
}
