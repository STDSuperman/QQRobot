import { Module } from '@nestjs/common'
import { GroupMessageHandlerService } from './group.service'
import BotSendModule from '@src/bot-send/send.module';
import UserModule from '@src/user/user.module';
import { VoteKickService } from './vote.service';
import CommonModule from '@src/bot-message/common-module/common.module'
import { TianXingMessageService } from '@src/bot-message/tianxing.service';
import TianModule from '@src/tian-api/tian.module';
@Module({
    imports: [BotSendModule, UserModule, TianModule, CommonModule],
    providers: [GroupMessageHandlerService, VoteKickService, TianXingMessageService]
})
export default class GroupMessageHandlerModule {}