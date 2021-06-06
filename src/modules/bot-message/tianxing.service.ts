/**
 * 处理天行API相关消息
 */

import { Injectable } from '@nestjs/common';
import { GroupChatMessage } from '@modules/bot-message/group-message-handler/interface/chat.interface';
import { CommonService } from '@modules/bot-message/common-module/common.service';
import { TianService } from '@modules/tian-api/tian.service';
import { BotSendService } from '@modules/bot-send/send.service';
import { ConfigService } from '@modules/config/config.service';
import { MessageChainItemType } from '@modules/bot-message/interface/message.interface';
import { FriendMessage } from '@modules/bot-message/friend-message-handler/friend.interface';

type MessageType = FriendMessage | GroupChatMessage;

@Injectable()
export class TianXingMessageService {
	private isFriendMessage = false;
	constructor(
		private commonService: CommonService,
		private tianXingHttpService: TianService,
		private readonly botSendService: BotSendService,
		private configService: ConfigService
	) {}

	handler = (message: MessageType, isFriendMessage = false) => {
		this.isFriendMessage = isFriendMessage;
		this.handleIsGetTianGou(message);
		this.handlerIsGetRainbowFart(message);
	};

	// 判断是否获取舔狗日记
	async handleIsGetTianGou(message: MessageType): Promise<void> {
		const { checkRes } = this.commonService.checkAtRobotAndInclueKey(
			message,
			'舔狗日记',
			this.isFriendMessage
		);
		if (checkRes) {
			const tianGouOneContent =
				await this.tianXingHttpService.getTiangouOne();
			message.messageChain = [
				{
					type: MessageChainItemType.Plain,
					text: tianGouOneContent
				}
			];
			this.isFriendMessage
				? this.commonService.sendFriendMessage(
						message as FriendMessage,
						tianGouOneContent
				  )
				: this.commonService.sendMessageToGroupList(
						message as GroupChatMessage,
						true
				  );
		}
	}

	// 判读是否获取彩虹屁
	async handlerIsGetRainbowFart(message: MessageType): Promise<void> {
		const { checkRes } = this.commonService.checkAtRobotAndInclueKey(
			message,
			'彩虹屁',
			this.isFriendMessage
		);
		if (checkRes) {
			const tianRainbowFart =
				await this.tianXingHttpService.getRainbowFart();
			message.messageChain = [
				{
					type: MessageChainItemType.Plain,
					text: tianRainbowFart
				}
			];
			this.isFriendMessage
				? this.commonService.sendFriendMessage(
						message as FriendMessage,
						tianRainbowFart
				  )
				: this.commonService.sendMessageToGroupList(
						message as GroupChatMessage,
						true
				  );
		}
	}

	async sendRoomMsg(roomId, messageChain) {
		this.botSendService.sendGroupMessage({
			sessionKey: await this.configService.getRedisConfig('sessionKey'),
			target: roomId,
			messageChain
		});
	}

	async handlerSendMessage(message: MessageType, text: string) {
		message.messageChain = [
			{
				type: MessageChainItemType.Plain,
				text
			}
		];
		this.isFriendMessage
			? this.commonService.sendFriendMessage(
					message as FriendMessage,
					text
			  )
			: this.commonService.sendMessageToGroupList(
					message as GroupChatMessage,
					true
			  );
	}
}
