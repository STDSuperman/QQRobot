import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	MessageBody,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import * as ws from 'ws';
import { ConfigService } from '../config/config.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerService } from '@modules/logger/logger.service';
import { MiraiService } from '@modules/mirai/mirai.service';
@WebSocketGateway()
export class WsGateway implements OnModuleInit {
	constructor(
		private readonly miraiService: MiraiService,
		private readonly configService: ConfigService,
		private readonly eventEmitter: EventEmitter2,
		private readonly logger: LoggerService,
	) {}

	@WebSocketServer()
	private bootServer: ws.Server;

	private clientServer: ws;

	async onModuleInit() {
		const sessionKey = await this.miraiService.getSessionKey();
		this.clientServer = new ws(
			`ws://${this.configService.get(
				'SERVER_HOST',
			)}:${this.configService.get(
				'BOT_SERVER_PORT',
			)}/message?sessionKey=${sessionKey}`,
		);
		this.clientServer.on('open', () => {
			console.log('ws connection');
		});
		this.clientServer.on('close', (e) => {
			console.log('ws disconnected');
			this.logger.warn(JSON.stringify(e));
		});
		this.clientServer.on('error', (e) => {
			console.log(e);
			this.logger.error(JSON.stringify(e));
		});
		this.clientServer.on('message', (botMessage = '') => {
			this.eventEmitter.emit(
				'bot.message',
				JSON.parse(botMessage as string),
			);
		});
	}

	@SubscribeMessage('event')
	handleSubscribe(@MessageBody() data) {
		return data;
	}
}
