import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';

@Controller('log')
export class LoggerController {
  constructor() {}

  @Get('/error')
  readErrorLog(): string {
    return ''
  }

  @Get('/others')
  readOtherLog(): string {
    return ''
  }
}
