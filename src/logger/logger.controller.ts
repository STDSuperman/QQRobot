import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import * as fs from 'fs';
import * as path from 'path'

@Controller('log')
export class LoggerController {
  constructor(
      private configService: ConfigService
  ) {}

  @Get('/error')
  readErrorLog(): string {
    return fs.readFileSync(
        path.resolve(this.configService.get('LOG_DIR'), 'error.log')
    ).toString();
  }

  @Get('/others')
  readOtherLog(): string {
    return fs.readFileSync(
        path.resolve(this.configService.get('LOG_DIR'), 'others.log')
    ).toString();
  }
}
