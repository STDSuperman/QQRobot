import { Injectable, HttpService } from '@nestjs/common';
import { CommandRegisterPayload } from './mirai.interface'
import { ConfigService } from '@src/config/config.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class MiraiService {
    constructor(
        private http: HttpService,
        private configService: ConfigService,
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
}