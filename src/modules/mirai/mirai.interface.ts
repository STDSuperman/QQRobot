export interface CommandRegisterPayload {
	authKey: string;
	name: string;
	alias: [string, string];
	description: string;
	usage?: string;
}
