import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsGatewayModule } from './modules/ws-gateway/ws.module'
import ConfigModule from './modules/config/config.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import BotMessageModule from './modules/bot-message/message.module';
import UserModule from './modules/user/user.module';
import MiraiModule from './modules/mirai/mirai.module';
import GlobalModule from '@/modules/global/global.module';
import DbModule from '@/modules/db/db.module'

@Module({
  imports: [
    ConfigModule,
    WsGatewayModule,
    EventEmitterModule.forRoot(),
    BotMessageModule,
    UserModule,
    MiraiModule,
    GlobalModule,
    DbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
