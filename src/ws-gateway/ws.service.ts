import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';
import { UserService } from '@/user/user.service'
@Injectable()
export class WsService {
    constructor(
        private http: HttpService,
        private configService: ConfigService,
        private userService: UserService
    ) {}

    async getSessionKey(): Promise<string> {
        let sessionKey = await this.configService.getRedisConfig('sessionKey');
        let isVerified = await this.verify(sessionKey);
        if (!sessionKey || !isVerified) {
            sessionKey = await this.getAuth();
            await this.configService.setRedisConfig('sessionKey', sessionKey);
            isVerified = await this.verify(sessionKey);
            !isVerified && console.error('verify faild');
        }
        return sessionKey;
    }
    async getAuth(): Promise<string> {
        return this.http.post('/auth', { authKey: this.configService.get('AUTH_KEY') })
            .pipe(
                map(res => {
                    if (res.data.code === 0) {
                        return res.data.session
                    }
                    console.error('get session key faild')
                    return '';
                })
            ).toPromise();
    }

    async verify(sessionKey: string): Promise<boolean> {
        if (!sessionKey) return false;
        return this.http.post('/verify', {
            sessionKey,
            qq: this.configService.get('QQAccount')
        })
        .toPromise()
        .then(async res => {
            if (res.data.code === 0) {
                console.log('verify success');
                return true;
            } else if (res.data.code === 2) { // 表示指定Bot不存在
                await this.userService.login(); // 走登录逻辑
            }
            return false;
        });
    }
}