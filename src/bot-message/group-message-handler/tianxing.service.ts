/**
 * 处理天行API相关消息
 */

import { Injectable } from '@nestjs/common'
import {
    GroupChatMessage
} from './interface/chat.interface';
import { CommonService } from '@src/bot-message/common.service'
import { TianService } from '@src/tian-api/tian.service';
import { BotSendService } from '@src/bot-send/send.service';
import { ConfigService } from '@src/config/config.service';
import { MessageChainItemType } from '@src/bot-message/interface/message.interface'

@Injectable()
export class TianXingMessageService {
    constructor(
        private commonService: CommonService,
        private tianXingHttpService: TianService,
        private readonly botSendService: BotSendService,
        private configService: ConfigService,
    ) {}

    handler = (message: GroupChatMessage) => {
        this.handleIsGetTianGou(message);
        this.handlerIsGetRainbowFart(message);
    }

    // 判断是否获取舔狗日记
    async handleIsGetTianGou(message: GroupChatMessage): Promise<void> {
        const { checkRes } = this.commonService.checkAtRobotAndInclueKey(message, '舔狗日记');
        if (checkRes) {
            const tianGouOneContent = await this.tianXingHttpService.getTiangouOne();
            this.sendRoomMsg(
                message.sender?.group?.id,
                [{
                    type: MessageChainItemType.Plain,
                    text: tianGouOneContent
                }]
            )
        }
    }

    // 判读是否获取彩虹屁
    async handlerIsGetRainbowFart(message: GroupChatMessage): Promise<void>{
        const { checkRes } = this.commonService.checkAtRobotAndInclueKey(message, '彩虹屁');
        if (checkRes) {
            const tianRainbowFart = await this.tianXingHttpService.getRainbowFart();
            this.sendRoomMsg(
                message.sender?.group?.id,
                [{
                    type: MessageChainItemType.Plain,
                    text: tianRainbowFart
                }]
            )
        }
    }

    async sendRoomMsg(roomId, messageChain) {
        this.botSendService.sendGroupMessage({
            sessionKey: await this.configService.getRedisConfig('sessionKey'),
            target: roomId,
            messageChain
        });
    }
}