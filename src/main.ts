import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws'
import { LoggerService } from '@/logger/logger.service';
import { GlobalExceptorFilter } from '@/common/filters/global-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter());
  app.useLogger(app.get(LoggerService));
  app.useGlobalFilters(new GlobalExceptorFilter);
  await app.listen(3000);
}
bootstrap();
