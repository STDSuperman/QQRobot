import { Module } from '@nestjs/common';
import { BotMessageService } from './message.service';
import GroupMessageHanlderModule from './group-message-handler/group.module';
import FriendMessageModule from './friend-message-handler/friend.module';
import BotSendModule from '@modules/bot-send/send.module';

@Module({
	imports: [GroupMessageHanlderModule, FriendMessageModule, BotSendModule],
	providers: [BotMessageService],
})
export default class BotMessageModule {}
