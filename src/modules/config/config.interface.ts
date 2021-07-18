import { AxiosRequestConfig } from 'axios';
export interface GlobalConfig {
	VERIFY_KEY: string;
	BOT_BASE_URL: string;
	BOT_SERVER_PORT: number;
	CACHE_TTL: number;
	REDIS_PORT: number;
	CONNECTION_GROUP_LIST: Array<number>;
	BotHttpConfig: AxiosRequestConfig;
	DB_NAME: string;
}

export interface RedisConfig {
	sessionKey: string;
	voteKickStatus: boolean;
	sendUserMsgData: string;
	[target: number]: string;
}

export interface EnvConfig {
	TIAN_API_KEY?: string;
	QQAccount?: string;
	QQPassword?: string;
	SERVER_HOST?: string;
}
