import { Controller, Get } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('log')
export class LoggerController {
  constructor(
    private loggerService: LoggerService
  ) {}

  @Get('/error')
  readErrorLog(): string {
    return this.loggerService.readErrorLog();
  }

  @Get('/others')
  readOtherLog(): string {
    return ''
  }
}
