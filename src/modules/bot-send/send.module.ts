import { Module, HttpModule } from '@nestjs/common';
import { BotSendService } from './send.service';
import { ConfigService } from '../config/config.service';
import MiraiModule from '@modules/mirai/mirai.module';

@Module({
	imports: [
		HttpModule.registerAsync({
			useFactory: async (configService: ConfigService) =>
				configService.get('BotHttpConfig'),
			inject: [ConfigService]
		}),
		MiraiModule
	],
	providers: [BotSendService],
	exports: [BotSendService]
})
export default class BotSendModule {}
