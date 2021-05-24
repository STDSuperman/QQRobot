/**
 * 处理投票踢人逻辑
 */

import { Injectable } from '@nestjs/common';
import { BotSendService } from '@modules/bot-send/send.service';
import { ConfigService } from '@modules/config/config.service';
import { UserService } from '@modules/user/user.service';
import { CommonService } from '@modules/bot-message/common-module/common.service';
import { GroupChatMessage } from './interface/chat.interface';
import { MessageChainItemType } from '@modules/bot-message/interface/message.interface';

@Injectable()
export class VoteKickService {
	private inVoteKickProgressList: Array<number> = []; // 当前正在被投的用户id号
	private inVoteKickIdTimerMap = {}; // 储存当前被投用户对应的计时器
	private currentVotedMemberMap = {}; // 储存当前被投用户对应的已投票人员
	private memberVotesMap = {}; // 当前被投用户票数

	constructor(
		private readonly botSendService: BotSendService,
		private configService: ConfigService,
		private userService: UserService,
		private commonService: CommonService
	) {}

	handler = (message: GroupChatMessage) => {
		this.handleIsAtMine(message);
	};

	// 处理艾特自己的情况
	async handleIsAtMine(message: GroupChatMessage): Promise<void> {
		const roomId = message?.sender?.group?.id;
		const {
			checkRes,
			otherAtMember
		} = this.commonService.checkAtRobotAndInclueKey(message, '投票踢人');
		if (checkRes) {
			// 检测投票踢人功能开关状态
			if (!(await this.configService.getRedisConfig('voteKickStatus'))) {
				this.botSendService.sendGroupMessage({
					sessionKey: await this.configService.getRedisConfig(
						'sessionKey'
					),
					target: roomId,
					messageChain: [
						{
							type: MessageChainItemType.Plain,
							text: `(｀▽′)ψ  投票踢人功能当前暂未开启，请联系管理员开启  (｀▽′)ψ`
						}
					]
				});
				return;
			}
			this.handleVoteKick(roomId, message?.sender.id, otherAtMember);
		}
	}

	// 校验用户是否已投
	checkUserIsVoted(memberId, voteKickId): boolean {
		return this.currentVotedMemberMap[memberId]?.includes(voteKickId);
	}

	// 投票踢人逻辑
	async handleVoteKick(
		roomId: number,
		voteKickId: number,
		otherAtMember: Array<number>
	) {
		const targetMember = otherAtMember[0];
		const isVoted = this.checkUserIsVoted(targetMember, voteKickId);
		const currentMemberVotes = await this.getMemberVotes(
			targetMember,
			voteKickId
		);
		const username = await this.getUserName(targetMember, roomId);
		let messageChain = [];
		if (isVoted) {
			const voteUserName = await this.getUserName(voteKickId, roomId);
			messageChain = [
				{
					type: MessageChainItemType.Plain,
					text: `🤖用户 👉${voteUserName}👈  已投票，请勿重复投票`
				}
			];
		} else if (otherAtMember.length <= 0) {
			messageChain = [
				{
					type: MessageChainItemType.Plain,
					text: '未检测到投票对象！'
				}
			];
		} else if (currentMemberVotes < 3) {
			let statusText = '进行中';
			this.saveVotedUser(targetMember, voteKickId);
			if (!this.inVoteKickProgressList.includes(targetMember)) {
				this.inVoteKickIdTimerMap[targetMember] = this.setVoteKickTime(
					this.inVoteKickProgressList.push(targetMember) - 1
				);
				statusText = '开启';
			}
			messageChain = [
				{
					type: MessageChainItemType.Plain,
					text: `🤖投票踢人流程${statusText}🤖\n\n⚠️ 规则：请艾特群管机器人并艾特需要投票移出群聊的对象，同时输入指令 📌投票踢人📌 即可进行投票\n\n⚠️ 被投对象超过3票将被移出群聊\n\n⚠️ 投票时长为5分钟，若未达到足够票数将取消本次流程，请谨慎使用该功能\n\n⚠️同一用户重复投票无效\n\n⚠️ 当前投票对象：${username}\n⚠️ 当前票数：${currentMemberVotes}
                `
				}
			];
		} else {
			messageChain = [
				{
					type: MessageChainItemType.Plain,
					text: `🤖用户 👉${username}👈  投票结果🤖\n\n⚠️最终票数：${currentMemberVotes}\n\n⚠️已禁言，即将被移出群聊`
				}
			];
			// 清理流程中账号与计时器和计数
			this.inVoteKickProgressList.splice(
				this.inVoteKickProgressList.findIndex(
					(item) => item === targetMember
				),
				1
			);
			clearTimeout(this.inVoteKickIdTimerMap[targetMember]);
			this.configService.setRedisConfig(targetMember, 0);
			// 进行移出群聊流程
			this.handlerRemoveProgress(targetMember, roomId);
		}
		// 提示投票踢人开启
		this.botSendService.sendGroupMessage({
			sessionKey: await this.configService.getRedisConfig('sessionKey'),
			target: roomId,
			messageChain
		});
	}

	// 获取用户的名字
	async getUserName(userId, roomId): Promise<string> {
		const targetMemberInfo = await this.commonService.getUserInfo(
			userId,
			roomId
		);
		const username =
			targetMemberInfo?.specialTitle ||
			targetMemberInfo?.name ||
			'未知用户';
		return username;
	}

	// 保存已投票用户信息
	saveVotedUser(memberId, voteKickId) {
		if (!this.currentVotedMemberMap[memberId]) {
			this.currentVotedMemberMap[memberId] = '';
		}
		this.currentVotedMemberMap[memberId] += voteKickId;
	}

	// 投票踢人计时
	setVoteKickTime(index: number): NodeJS.Timeout {
		return setTimeout(() => {
			// 倒计时结束如果还未清除的话
			this.inVoteKickProgressList[index] &&
				this.inVoteKickProgressList.splice(index, 1);
		}, 5 * 60 * 1000);
	}

	// 投票通过处理逻辑
	async handlerRemoveProgress(memberId, roomId): Promise<boolean> {
		// const result = await this.userService.muteMember(memberId, roomId, 5 * 60);
		const result = await this.userService.kickMember(
			memberId,
			roomId,
			'您被投票移出群聊'
		);
		return result;
	}

	// 计票
	async getMemberVotes(
		memberId: number,
		voteKickId: number
	): Promise<number> {
		let current = this.memberVotesMap[memberId] || 0;
		if (this.currentVotedMemberMap[memberId]?.includes(voteKickId))
			return current;
		current++;
		this.memberVotesMap[memberId] = current;
		return current;
	}
}
