import { Module, HttpModule } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import MiraiModule from '@/mirai/mirai.module'
@Module({
  imports: [MiraiModule],
  providers: [WsGateway]
})
export class WsGatewayModule {}