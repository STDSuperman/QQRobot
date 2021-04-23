import { Module } from '@nestjs/common'
import { FriendMessageService } from './friend.service'
import BotSendModule from '@/bot-send/send.module';
import UserModule from '@/user/user.module';
import TianModule from '@/tian-api/tian.module';
import CommonModule from '@/bot-message/common-module/common.module'
import { TianXingMessageService } from '@/bot-message/tianxing.service';

@Module({
    imports: [BotSendModule, UserModule, TianModule, CommonModule],
    providers: [FriendMessageService, TianXingMessageService]
})
export default class FriendMessageHandlerModule {}