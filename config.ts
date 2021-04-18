const BOT_BASE_URL = ''; // 后续会从env读取赋值

export default {
    AUTH_KEY: "1234567890",
    BOT_BASE_URL,
    BOT_SERVER_PORT: 9999,
    CACHE_TTL: 7890000,
    REDIS_PORT: 6379,
    CONNECTION_GROUP_LIST: [
        // 704915550,
        // 849247690,
        // 687817188,
        584809117,
        851937215
    ],
    BotHttpConfig: {
        timeout: 5000,
        maxRedirects: 5,
        baseURL: BOT_BASE_URL
    }
}