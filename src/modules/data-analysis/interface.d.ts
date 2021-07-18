import { MemberPermission } from '@modules/bot-message/group-message-handler/interface/chat.interface';

declare global {
	interface GroupSendMessageInfo {
		sendTimestamp: Date;
		groupName: string;
		groupId: number;
		permission: keyof MemberPermission;
		memberName: string;
		memberId: number;
	}

	interface GroupUserSendListInfo {
		total: number;
		dateMap: Record<string, GroupSendMessageInfo[]>;
	}
}
