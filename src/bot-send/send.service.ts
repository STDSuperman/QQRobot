import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { SendGroupMessage, SendFriendMessage } from './interface/send.interface'

@Injectable()
export class BotSendService {
    constructor(private http: HttpService) {}

    // 发送群消息
    async sendGroupMessage(messageData: SendGroupMessage): Promise<boolean> {
        return this.http.post('/sendGroupMessage', messageData).pipe(
            map(res => res.data.code === 0)
        ).toPromise();
    }

    // 发送好友消息
    async sendFriendMessage(messageData: SendFriendMessage): Promise<boolean> {
        return this.http.post('/sendFriendMessage', messageData).pipe(
            map(res => res.data.code === 0)
        ).toPromise();
    }
}