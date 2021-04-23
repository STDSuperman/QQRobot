import { Module } from '@nestjs/common'
import { CommonService } from '@/bot-message/common-module/common.service'
import UserModule from '@/user/user.module';
import BotSendModule from '@/bot-send/send.module';

@Module({
    imports: [UserModule, BotSendModule],
    providers: [CommonService],
    exports: [CommonService]
})
export default class CommonModule {}