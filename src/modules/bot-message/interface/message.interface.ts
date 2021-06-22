export enum MessageType {
	GroupMessage = 'GroupMessage',
	FriendMessage = 'FriendMessage',
	TempMessage = 'TempMessage'
}

export enum MessageChainItemType {
	Plain = 'Plain',
	Source = 'Source',
	Image = 'Image',
	Face = 'Face',
	Quote = 'Quote',
	At = 'At'
}

export interface MessageChainItemPlain {
	type: MessageChainItemType.Plain;
	text: string;
}

export interface MessageChainItemSource {
	type: MessageChainItemType.Source;
	id: number;
	time: number;
}

export interface MessageChainItemImage {
	type: MessageChainItemType.Image;
	imageId?: string;
	url: string;
	path?: string;
}

export interface MessageChainFace {
	type: MessageChainItemType.Face;
	faceId: number;
	name: string;
}

export interface MessageChainQuote {
	type: MessageChainItemType.Quote;
	id: number;
	senderId: number;
	targetId: number;
	groupId: number;
}

export interface MessageChainAt {
	type: MessageChainItemType.At;
	target: number;
	display: string;
}

export type MessageChainItem =
	| MessageChainItemPlain
	| MessageChainItemSource
	| MessageChainItemImage
	| MessageChainFace
	| MessageChainQuote
	| MessageChainAt;

export interface MessageChain extends Array<MessageChainItem> {
	[index: number]: MessageChainItem;
}
