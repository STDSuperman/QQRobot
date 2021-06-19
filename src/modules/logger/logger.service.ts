import { Injectable, Logger as AppLogger } from '@nestjs/common';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { LowDbService, LowDBInstance } from '@modules/db/db.service';
import * as UUID from 'uuid';
@Injectable()
export class LoggerService extends AppLogger {
	private logger: winston.Logger;
	constructor(private lowDB: LowDbService) {
		super();
		this.logger = winston.createLogger({
			format: winston.format.json(),
			transports: [
				new DBTransport({ LowDBInstance: this.lowDB }),
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.colorize(),
						winston.format.simple(),
						winston.format.timestamp(),
						winston.format.prettyPrint()
					)
				})
			],
			handleExceptions: true
		});
	}

	warn(message: string | Record<string, unknown>): void {
		this.logger.warn(this.checkAndFormatData(message));
	}

	error(message: string | Record<string, unknown>): void {
		this.logger.error(this.checkAndFormatData(message));
	}

	log(message: string | Record<string, unknown>): void {
		this.logger.log('info', this.checkAndFormatData(message));
	}

	debug(message: string | Record<string, unknown>): void {
		this.logger.debug(this.checkAndFormatData(message));
	}
	verbose(message: any): void {
		this.logger.verbose(this.checkAndFormatData(message));
	}

	checkAndFormatData(message): string {
		return typeof message === 'string' ? message : JSON.stringify(message);
	}

	readErrorLog(pageNum, pageSize = 20, sort) {
		return this.lowDB.readRecentData('errorLogs', pageSize, pageNum, sort);
	}

	readErrorLogSize() {
		return this.lowDB.getDataSize('errorLogs');
	}
}

interface DBTransportOptions extends Transport.TransportStreamOptions {
	LowDBInstance: any;
}
// 自定义winston transport
class DBTransport extends Transport {
	private DBInstance: LowDBInstance;
	private options;
	constructor(opts: DBTransportOptions) {
		super(opts);
		this.options = opts;
		this.DBInstance = opts.LowDBInstance;
	}

	log({ level, message }, callback) {
		try {
			message = JSON.parse(message);
		} catch {}
		level === 'error' &&
			this.DBInstance.pushOne('errorLogs', {
				level,
				message: message,
				dateString: new Date().toLocaleString(),
				timestamp: new Date().getTime(),
				id: UUID.v1()
			});
		callback();
	}
}
