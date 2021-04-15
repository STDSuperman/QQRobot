const BOT_BASE_URL = "http://localhost:9999";

export default {
    AUTH_KEY: "1234567890",
    QQ: 2738794211,
    BOT_BASE_URL,
    BOT_SERVER_PORT: 9999,
    REDIS_HOST: 'localhost',
    CACHE_TTL: 7890000,
    REDIS_PORT: 6379,
    CONNECTION_GROUP_LIST: [
        704915550,
        849247690,
        // 851937215
        687817188
    ],
    BotHttpConfig: {
        timeout: 5000,
        maxRedirects: 5,
        baseURL: BOT_BASE_URL
    }
}