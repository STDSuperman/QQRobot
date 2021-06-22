export interface MemberInfo {
	nickname?: string;
	email?: string;
	age?: number;
	level?: number;
	sign?: number;
	sex?: string;
	avatar?: string;
}

export interface MuteMemberPayload {
	sessionKey: string;
	target: number;
	memberId: number;
	time: number;
}

export interface KickMemberPayload {
	sessionKey: string;
	target: number;
	memberId: number;
	msg?: string;
}
type LoginPayloadArgs = [number, string];
export interface LoginPayload {
	verifyKey: string;
	name: string;
	args: LoginPayloadArgs;
}
