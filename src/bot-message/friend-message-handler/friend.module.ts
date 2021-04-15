import { Module } from '@nestjs/common'
import { FriendMessageService } from './friend.service'
import BotSendModule from '@src/bot-send/send.module';
import UserModule from '@src/user/user.module';
import TianModule from '@src/tian-api/tian.module';
import { CommonService } from '@src/bot-message/common.service'

@Module({
    imports: [BotSendModule, UserModule, TianModule],
    providers: [FriendMessageService, CommonService]
})
export default class GroupMessageHandlerModule {}