export interface CommandRegisterPayload {
	verifyKey: string;
	name: string;
	alias: [string, string];
	description: string;
	usage?: string;
}
