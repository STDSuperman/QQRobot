import { Controller, Post, Body } from '@nestjs/common';
import { BotSendService } from './send.service';
import { SendGroupMessage } from './interface/send.interface';
import { ConfigService } from '@modules/config/config.service';
import { MessageChainItemType } from '@modules/bot-message/interface/message.interface';

export interface ISuccessResponse {
	code: number;
	message: string;
}

@Controller('/sendMessage')
export class SendController {
	constructor(
		private readonly appService: BotSendService,
		private configService: ConfigService
	) {}

	@Post('/sendGroupMessage')
	async handleSendGroupMessage(
		@Body('roomId') roomId: number,
		@Body('message') message: string
	): Promise<ISuccessResponse> {
		const messageData: SendGroupMessage = {
			sessionKey: await this.configService.getRedisConfig('sessionKey'),
			target: roomId,
			messageChain: [
				{
					type: MessageChainItemType.Plain,
					text: message
				}
			]
		};
		console.log(messageData);

		const success = await this.appService.sendGroupMessage(messageData);

		return {
			code: success ? 0 : -500,
			message: success ? '成功' : '失败'
		};
	}
}
