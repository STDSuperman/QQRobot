import { Injectable, Logger as AppLogger } from '@nestjs/common';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { LowDbService, LowDBInstance } from '@modules/db/db.service';
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
						winston.format.prettyPrint(),
					),
				}),
			],
			handleExceptions: true,
		});
	}

	warn(message: string): void {
		this.logger.warn(message);
	}

	error(message: string): void {
		this.logger.error(message);
	}

	log(message: string): void {
		this.logger.log('info', message);
	}

	debug(message: string): void {
		this.logger.debug(message);
	}
	verbose(message: any): void {
		this.logger.verbose(message);
	}

	readErrorLog() {
		return this.lowDB.readAll('errorLogs');
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
		level === 'error' &&
			this.DBInstance.pushOne('errorLogs', {
				level,
				message,
				timestamp: new Date().toTimeString(),
			});
		callback();
	}
}
