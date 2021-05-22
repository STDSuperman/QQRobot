import { Injectable, HttpService, UsePipes } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { SendGroupMessage, SendFriendMessage } from './interface/send.interface'
import { LoggerService } from '@/modules/logger/logger.service'
import { MiraiService } from '@/modules/mirai/mirai.service';

@Injectable()
export class BotSendService {
    constructor(
        private http: HttpService,
        private logger: LoggerService,
        private readonly miraiService: MiraiService
    ) {}

    // 发送群消息
    async sendGroupMessage(messageData: SendGroupMessage): Promise<boolean> {
        await this.checkSessionKey(messageData);
        return this.http.post('/sendGroupMessage', messageData).pipe(
            map(res => res.data.code === 0)
        ).toPromise()
        .catch((e) => {
            const logObj = {
                type: 'sendGroupMessage',
                message: e.message || JSON.stringify(e),
                payload: messageData
            }
            this.logger.error(JSON.stringify(logObj));
            return false;
        });;
    }

    // 发送好友消息
    async sendFriendMessage(messageData: SendFriendMessage): Promise<boolean> {
        await this.checkSessionKey(messageData);
        return this.http.post('/sendFriendMessage', messageData).pipe(
            map(res => res.data.code === 0)
        ).toPromise()
        .catch((e) => {
            const logObj = {
                type: 'sendFriendMessage',
                message: e.message || JSON.stringify(e),
                payload: messageData
            }
            this.logger.error(JSON.stringify(logObj));
            return false;
        });
    }

    // 检查 sessionKey
    async checkSessionKey(messageData: SendGroupMessage | SendFriendMessage) {
        messageData.sessionKey = messageData.sessionKey ?? await this.miraiService.getSessionKey();;
        return messageData;
    }
}