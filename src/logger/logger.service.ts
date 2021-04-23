import { Injectable, Logger  as AppLogger  } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';

@Injectable()
export class LoggerService extends  AppLogger  {
    private logger: Partial<winston.Logger> = {};
    constructor() {
        super();
        const logDir = path.resolve(process.cwd(), 'src/logger/logs')
        this.logger = winston.createLogger({
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: path.resolve(logDir, 'error.log'), level: 'error' }),
                new winston.transports.File({ filename: path.resolve(logDir, 'others.log') }),
                new winston.transports.Console({format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )})
            ]
        })
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
    };
}