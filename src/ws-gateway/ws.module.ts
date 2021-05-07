import { Module, HttpModule } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { WsService } from './ws.service';
import { ConfigService } from '../config/config.service';
import { UserService } from '@/user/user.service'
@Module({
  imports: [
    HttpModule.registerAsync({
        useFactory: async (configService: ConfigService) => configService.get('BotHttpConfig'),
        inject: [ConfigService]
    })
  ],
  providers: [WsGateway, WsService, UserService]
})
export class WsGatewayModule {}