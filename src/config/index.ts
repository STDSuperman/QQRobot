const BOT_BASE_URL = ''; // 后续会从env读取赋值

export default {
	// mirai-api-http 配置的 verifyKey 内容
	VERIFY_KEY: '1234567890',
	// 你登录mirai QQ 机器人的服务器地址，从根目录下.env文件中获取
	BOT_BASE_URL,
	// mirai-api-http 配置的 port 内容
	BOT_SERVER_PORT: 9999,
	// redis 缓存时间（这里设置一个很长的时间）
	CACHE_TTL: 12 * 30 * 24 * 60 * 60 * 1000,
	// redis 的端口
	REDIS_PORT: 6379,
	// 机器人需要监听的QQ群列表（若不配置则群内艾特输入关键词无效）
	CONNECTION_GROUP_LIST: [
		704915550,
		849247690,
		687817188
		// 337319135
		// 851937215
	],
	// 与mirai机器人服务通信的 axios 配置
	BotHttpConfig: {
		timeout: 5000,
		maxRedirects: 5,
		baseURL: BOT_BASE_URL
	}
};
