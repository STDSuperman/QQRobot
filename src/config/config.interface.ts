import { AxiosRequestConfig } from 'axios'
export interface GlobalConfig {
    AUTH_KEY: string;
    QQ: number;
    BOT_BASE_URL: string;
    BOT_SERVER_PORT: number;
    REDIS_HOST: string;
    CACHE_TTL: number;
    REDIS_PORT: number;
    CONNECTION_GROUP_LIST: Array<number>;
    BotHttpConfig: AxiosRequestConfig;
    TIAN_API_KEY: string;
    QQAccount: string;
    QQPassword: string;
}

export interface RedisConfig {
    sessionKey: string;
    voteKickStatus: boolean;
    [target: number]: string;
}