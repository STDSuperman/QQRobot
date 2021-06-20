import { Module } from '@nestjs/common';
import { GroupMessageHandlerService } from './group.service';
import BotSendModule from '@modules/bot-send/send.module';
import UserModule from '@modules/user/user.module';
import { VoteKickService } from './vote.service';
import CommonModule from '@modules/bot-message/common-module/common.module';
import { TianXingMessageService } from '@modules/bot-message/tianxing.service';
import TianModule from '@modules/tian-api/tian.module';
import { GroupAnalysisService } from '@modules/data-analysis/analysis.service';
@Module({
	imports: [BotSendModule, UserModule, TianModule, CommonModule],
	providers: [
		GroupMessageHandlerService,
		VoteKickService,
		TianXingMessageService,
		GroupAnalysisService
	]
})
export default class GroupMessageHandlerModule {}
