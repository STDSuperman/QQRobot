import { AxiosRequestConfig } from 'axios'
export interface GlobalConfig {
    AUTH_KEY: string;
    BOT_BASE_URL: string;
    BOT_SERVER_PORT: number;
    CACHE_TTL: number;
    REDIS_PORT: number;
    CONNECTION_GROUP_LIST: Array<number>;
    BotHttpConfig: AxiosRequestConfig;
    LOG_DIR: string;
}

export interface RedisConfig {
    sessionKey: string;
    voteKickStatus: boolean;
    [target: number]: string;
}

export interface EnvConfig {
    TIAN_API_KEY?: string;
    QQAccount?: string;
    QQPassword?: string;
    SERVER_HOST?: string;
}