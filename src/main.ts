import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { LoggerService } from '@/modules/logger/logger.service';
import { GlobalExceptorFilter } from '@/common/filters/global-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	app.useWebSocketAdapter(new WsAdapter());
	app.useLogger(app.get(LoggerService));
	app.useGlobalFilters(new GlobalExceptorFilter());
	await app.listen(3000, () => {
		console.log('Service listening in 3000');
	});
}
bootstrap();
