import { Module } from '@nestjs/common'
import { GroupMessageHandlerService } from './group.service'
import BotSendModule from '@/bot-send/send.module';
import UserModule from '@/user/user.module';
import { VoteKickService } from './vote.service';
import CommonModule from '@/bot-message/common-module/common.module'
import { TianXingMessageService } from '@/bot-message/tianxing.service';
import TianModule from '@/tian-api/tian.module';
@Module({
    imports: [BotSendModule, UserModule, TianModule, CommonModule],
    providers: [GroupMessageHandlerService, VoteKickService, TianXingMessageService]
})
export default class GroupMessageHandlerModule {}