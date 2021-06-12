import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';
import { map } from 'rxjs/operators';
import { RainbowFartOrTianGouResponse } from './interface/tian.interface';
import { LoggerService } from '@modules/logger/logger.service';

@Injectable()
export class TianService {
	private tianApiKey: string;

	constructor(
		private http: HttpService,
		private configService: ConfigService,
		private readonly logger: LoggerService
	) {
		this.tianApiKey = this.configService.get('TIAN_API_KEY');
	}

	// 随机获取一条舔狗日记
	getTianGouOne(): Promise<string> {
		return this.http
			.get(`/txapi/tiangou/index?key=${this.tianApiKey}`)
			.pipe(
				map((res) => {
					const data: RainbowFartOrTianGouResponse = res.data;
					if (data.code === 200) {
						return data?.newslist[0]?.content;
					}
					return '';
				})
			)
			.toPromise()
			.catch((e) => {
				this.logger.error(e.message || '获取舔狗日记失败');
				return '获取失败';
			});
	}

	// 彩虹屁
	async getRainbowFart(): Promise<string> {
		return this.http
			.get(`/txapi/caihongpi/index?key=${this.tianApiKey}`)
			.pipe(
				map((res) => {
					const data: RainbowFartOrTianGouResponse = res.data || {};
					if (data.code === 200) {
						return data?.newslist[0]?.content;
					}
					return '';
				})
			)
			.toPromise()
			.catch((e) => {
				this.logger.error(e.message || '获取彩虹屁失败');
				return '获取失败';
			});
	}
}
