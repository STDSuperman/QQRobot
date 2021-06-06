export interface IErrorLogItem {
	dateString: string;
	level: string;
	message: string;
	timestamp: number;
}

export interface IErrorLogResponse {
	code: number;
	data: IErrorLogItem[];
}
