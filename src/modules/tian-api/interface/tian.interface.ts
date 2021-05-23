export interface NewListItem {
	content: string;
}

export interface RainbowFartOrTianGouResponse {
	code: number;
	msg: string;
	newslist: Array<NewListItem>;
}
