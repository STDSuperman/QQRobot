import { Controller, Get, Query } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { IErrorLogResponse } from '@/modules/logger/logger.interface';
@Controller('log')
export class LoggerController {
	constructor(private loggerService: LoggerService) {}

	@Get('/error')
	readErrorLog(@Query('pageNum') pageNum = 1): IErrorLogResponse {
		return {
			code: 0,
			data: this.loggerService.readErrorLog(pageNum)
		};
	}

	@Get('/others')
	readOtherLog(): string {
		return '';
	}
}
