export interface MemberInfo {
    name?: string;
    specialTitle?: string;
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
type LoginPayloadArgs = [string, string];
export interface LoginPayload {
    authKey: string;
    name: string;
    args: LoginPayloadArgs
}