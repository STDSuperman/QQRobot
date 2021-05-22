import { Module } from '@nestjs/common'
import { CommonService } from '@/modules/bot-message/common-module/common.service'
import UserModule from '@/modules/user/user.module';
import BotSendModule from '@/modules/bot-send/send.module';

@Module({
    imports: [UserModule, BotSendModule],
    providers: [CommonService],
    exports: [CommonService]
})
export default class CommonModule {}