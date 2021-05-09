import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsGatewayModule } from './ws-gateway/ws.module'
import ConfigModule from './config/config.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import BotMessageModule from './bot-message/message.module';
import UserModule from './user/user.module';
import MiraiModule from './mirai/mirai.module';
import GlobalModule from '@/global/global.module'

@Module({
  imports: [
    ConfigModule,
    WsGatewayModule,
    EventEmitterModule.forRoot(),
    BotMessageModule,
    UserModule,
    MiraiModule,
    GlobalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
