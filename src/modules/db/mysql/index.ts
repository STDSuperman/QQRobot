import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class MysqlDBService {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}
	async createGroupChatMessage(data) {
		return this.prisma.groupChatMessage.create({ data });
	}

	async findMessageListByDate(date) {
		const startTime = new Date(`${date} 00:00:00`)
			.getTime()
			.toString()
			.slice(0, 10);
		const endTime = new Date(`${date} 23:59:59`)
			.getTime()
			.toString()
			.slice(0, 10);
		return this.prisma.$queryRaw(
			`SELECT * FROM groupChatMessage where sendTimestamp between ${startTime} and ${endTime}`
		);
	}
}
