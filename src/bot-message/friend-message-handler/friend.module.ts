import { Module } from '@nestjs/common'
import { FriendMessageService } from './friend.service'
import BotSendModule from '@src/bot-send/send.module';
import UserModule from '@src/user/user.module';
import TianModule from '@src/tian-api/tian.module';
import CommonModule from '@src/bot-message/common-module/common.module'
import { TianXingMessageService } from '@src/bot-message/tianxing.service';

@Module({
    imports: [BotSendModule, UserModule, TianModule, CommonModule],
    providers: [FriendMessageService, TianXingMessageService]
})
export default class FriendMessageHandlerModule {}