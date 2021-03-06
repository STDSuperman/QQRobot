import {
	WebSocketGateway,
	SubscribeMessage,
	WebSocketServer,
	OnGatewayConnection
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import * as ws from 'ws';
import { ConfigService } from '../config/config.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerService } from '@modules/logger/logger.service';
import { IBotMessage } from '@modules/ws-gateway/ws.interface';
import { MiraiService } from '@modules/mirai/mirai.service';
import { GET_DATA_BOARD } from '@modules/ws-gateway/constant';
import { WsService } from '@modules/ws-gateway/ws.service';
import { debounceTime } from '@utils/index';
@WebSocketGateway(3001)
export class WsGateway implements OnModuleInit, OnGatewayConnection {
	constructor(
		private miraiService: MiraiService,
		private readonly configService: ConfigService,
		private readonly eventEmitter: EventEmitter2,
		private readonly logger: LoggerService,
		private readonly wsService: WsService
	) {}

	private clientServer: ws;
	private clientList: any[] = [];

	@WebSocketServer()
	private serverWsServer: ws.Server;

	async handleConnection(client) {
		this.clientList.push(client);
	}

	// 连接 QQ 实例的 ws 服务
	async onModuleInit() {
		this.clientServer = new ws(
			`ws://${this.configService.get(
				'SERVER_HOST'
			)}:${this.configService.get(
				'BOT_SERVER_PORT'
			)}/message?verifyKey=${this.configService.get(
				'VERIFY_KEY'
			)}&qq=${this.configService.get(
				'QQAccount'
			)}&sessionKey=${await this.miraiService.getSessionKey()}`
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

		const broadcastMsg = debounceTime(async () => {
			this.broadcast(await this.handleSubscribe());
		}, 1000);

		this.clientServer.on('message', async (botMessage: string) => {
			this.eventEmitter.emit(
				'bot.message',
				(JSON.parse(botMessage) as IBotMessage).data
			);
			broadcastMsg();
		});
	}

	broadcast(data: any) {
		this.clientList.forEach((client) => {
			client.send(JSON.stringify(data));
		});
	}

	@SubscribeMessage(GET_DATA_BOARD)
	async handleSubscribe() {
		const data = await this.wsService.getDataBoardData();
		return {
			event: GET_DATA_BOARD,
			data
		};
	}
}
