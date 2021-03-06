import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import {
	MemberInfo,
	MuteMemberPayload,
	KickMemberPayload,
	LoginPayload
} from './user.interface';

@Injectable()
export class UserService {
	constructor(
		private http: HttpService,
		private configService: ConfigService
	) {}

	// 机器人登录
	async login() {
		const loginPayload: LoginPayload = {
			verifyKey: this.configService.get('VERIFY_KEY'),
			name: 'login',
			args: [
				+(await this.configService.get('QQAccount')),
				await this.configService.get('QQPassword')
			]
		};
		this.http
			.post('/command/send', loginPayload)
			.pipe(
				map((res) => {
					console.log(res.data);
				})
			)
			.toPromise();
	}

	// 获取单个群员信息
	async getGroupMemberInfo(
		memberId: number,
		roomId: number
	): Promise<MemberInfo> {
		return this.http
			.get<AxiosRequestConfig>(`/memberProfile`, {
				params: {
					sessionKey: await this.configService.getRedisConfig(
						'sessionKey'
					),
					target: roomId,
					memberId
				}
			})
			.pipe(
				map<AxiosResponse, MemberInfo>(
					(res: AxiosResponse): MemberInfo => {
						if (res.data) {
							res.data.avatar = `http://q1.qlogo.cn/g?b=qq&nk=${memberId}&s=640`;
							return res.data as MemberInfo;
						}
						return {};
					}
				)
			)
			.toPromise<MemberInfo>();
	}

	// 禁言
	async muteMember(
		memberId: number,
		roomId: number,
		time: number
	): Promise<boolean> {
		const muteMemberPayload: MuteMemberPayload = {
			sessionKey: await this.configService.getRedisConfig('sessionKey'),
			target: roomId,
			memberId,
			time
		};
		return this.http
			.post('/mute', muteMemberPayload)
			.pipe(
				map((res) => {
					if (res.data.code === 0) return true;
					return false;
				})
			)
			.toPromise();
	}

	// 移除群聊
	async kickMember(
		memberId: number,
		roomId: number,
		msg: string
	): Promise<boolean> {
		const kickMemberPayload: KickMemberPayload = {
			sessionKey: await this.configService.getRedisConfig('sessionKey'),
			target: roomId,
			memberId,
			msg
		};
		return this.http
			.post('/kick', kickMemberPayload)
			.pipe(
				map((res) => {
					if (res.data.code === 0) return true;
					return false;
				})
			)
			.toPromise();
	}
}
