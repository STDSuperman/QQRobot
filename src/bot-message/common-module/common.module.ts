import { Module } from '@nestjs/common'
import { CommonService } from '@src/bot-message/common-module/common.service'
import UserModule from '@src/user/user.module';
import BotSendModule from '@src/bot-send/send.module';

@Module({
    imports: [UserModule, BotSendModule],
    providers: [CommonService],
    exports: [CommonService]
})
export default class CommonModule {}