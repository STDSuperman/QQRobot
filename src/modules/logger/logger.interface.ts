export interface IErrorLogItem {
	dateString: string;
	level: string;
	message: string;
	timestamp: number;
}

export interface IErrorLogResponseData {
	results: IErrorLogItem[];
	total: number;
}

export interface IErrorLogResponse {
	code: number;
	data: IErrorLogResponseData;
}

export enum ESortType {
	ascending = 1,
	descending = 2
}
