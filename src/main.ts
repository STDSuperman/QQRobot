import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws'
import { LoggerService } from '@/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });
  app.useWebSocketAdapter(new WsAdapter());
  app.useLogger(app.get(LoggerService));
  await app.listen(3000);
}
bootstrap();
