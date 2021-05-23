import { Module } from '@nestjs/common';
import { FriendMessageService } from './friend.service';
import BotSendModule from '@modules/bot-send/send.module';
import UserModule from '@modules/user/user.module';
import TianModule from '@modules/tian-api/tian.module';
import CommonModule from '@modules/bot-message/common-module/common.module';
import { TianXingMessageService } from '@modules/bot-message/tianxing.service';

@Module({
	imports: [BotSendModule, UserModule, TianModule, CommonModule],
	providers: [FriendMessageService, TianXingMessageService],
})
export default class FriendMessageHandlerModule {}
