import { Module } from '@nestjs/common'
import { GroupMessageHandlerService } from './group.service'
import BotSendModule from '@src/bot-send/send.module';
import UserModule from '@src/user/user.module';
import { VoteKickService } from './vote.service';
import { CommonService } from '@src/bot-message/common.service'
import { TianXingMessageService } from './tianxing.service';
import TianModule from '@src/tian-api/tian.module';

@Module({
    imports: [BotSendModule, UserModule, TianModule],
    providers: [GroupMessageHandlerService, VoteKickService, CommonService, TianXingMessageService]
})
export default class GroupMessageHandlerModule {}