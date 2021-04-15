import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import * as ws from 'ws';
import { WsService } from './ws.service'
import { ConfigService } from '../config/config.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
@WebSocketGateway()
export class WsGateway implements OnModuleInit {
    constructor(
        private readonly wsService: WsService,
        private readonly configService: ConfigService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    @WebSocketServer()
    private bootServer: ws.Server;

    private clientServer: ws

    async onModuleInit() {
        const sessionKey = await this.wsService.getSessionKey();
        this.clientServer = new ws(`ws://localhost:${this.configService.get('BOT_SERVER_PORT')}/message?sessionKey=${sessionKey}`);
        this.clientServer.on('open', (e) => {
            console.log('ws connection');
        })
        this.clientServer.on('close', function close() {
            console.log('ws disconnected');
        });
        this.clientServer.on('error', e => {
            console.log(e);
        })
        this.clientServer.on('message', (botMessage: string = '') => {
            this.eventEmitter.emit(
                'bot.message',
                JSON.parse(botMessage)
            );
        })
    }

    @SubscribeMessage('event')
    handleSubscribe(@MessageBody() data) {
        return data;
    }
}
