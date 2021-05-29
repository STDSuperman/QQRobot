import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import MiraiModule from '@modules/mirai/mirai.module';
@Module({
	imports: [MiraiModule],
	providers: [WsGateway]
})
export class WsGatewayModule {}
