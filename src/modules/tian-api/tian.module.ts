import { Module, HttpModule } from '@nestjs/common';
import { TianService } from './tian.service';

@Module({
	imports: [
		HttpModule.register({
			baseURL: 'http://api.tianapi.com',
			timeout: 5000,
			maxRedirects: 5,
		}),
	],
	providers: [TianService],
	exports: [TianService],
})
export default class TianAPIModule {}
