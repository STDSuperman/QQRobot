import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import config from '@/config';
@Injectable()
export class MysqlDBService {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}
	async createGroupChatMessage(data) {
		return this.prisma[config.DB_NAME].create({ data });
	}
	// 查询特定日期当天群聊数据
	async findMessageListByDate(
		startTime: string,
		endTime: string
	): Promise<any[]> {
		return this.prisma.$queryRaw(
			`SELECT * FROM ${config.DB_NAME} where sendTimestamp between '${startTime}' and '${endTime}'`
		);
	}

	// 查询当天群聊活跃人数
	async getSendMessageUserCountByDate(
		startTime: string,
		endTime: string
	): Promise<any[]> {
		return this.prisma.$queryRaw(
			`SELECT count(distinct memberId) as activeUserCount FROM ${config.DB_NAME} where sendTimestamp between '${startTime}' and '${endTime}'`
		);
	}
}
