import { Injectable, HttpService } from '@nestjs/common';
import { CommandRegisterPayload } from './mirai.interface'
import { ConfigService } from '@/modules/config/config.service';
import { map } from 'rxjs/operators';
import { UserService } from '@/modules/user/user.service'
import { LoggerService } from '@/modules/logger/logger.service'

@Injectable()
export class MiraiService {
    constructor(
        private http: HttpService,
        private configService: ConfigService,
        private userService: UserService,
        private logger: LoggerService
    ) {
        this.init();
    }

    async init() {
        // this.registerCommand();
    }

    async registerCommand() {
        const commandRegisterPayload: CommandRegisterPayload = {
            authKey: this.configService.get('AUTH_KEY'),
            name: 'login',
            alias: ['lg', 'SignIn'],
            description: '登录指令',
            usage: '用于进行登录操作'
        };
        this.http.post('/command/register', commandRegisterPayload).pipe(map(res => {
            console.log(res.data);
        })).toPromise()
    }

    async getSessionKey(): Promise<string> {
        let sessionKey = await this.configService.getRedisConfig('sessionKey');
        let isVerified = await this.verify(sessionKey);
        if (!sessionKey || !isVerified) {
            sessionKey = await this.fetchSessionKey();
            await this.configService.setRedisConfig('sessionKey', sessionKey);
            isVerified = await this.verify(sessionKey);
            !isVerified && console.error('verify faild');
        }
        return sessionKey;
    }
    async fetchSessionKey(): Promise<string> {
        return this.http.post('/auth', { authKey: this.configService.get('AUTH_KEY') })
            .pipe(
                map(res => {
                    if (res.data.code === 0) {
                        return res.data.session
                    }
                    this.logger.error(`get session key faild`);
                    return '';
                })
            ).toPromise()
            .catch((e) => {
                this.logger.error(`get session key faild: ${e.message || JSON.stringify(e)}`);
            });
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
        }).catch((e) => {
            this.logger.error(`verify session key faild: ${e.message || JSON.stringify(e)}`);
            return false;
        });
    }
}