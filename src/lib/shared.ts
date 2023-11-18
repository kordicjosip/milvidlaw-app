export enum webinarTypes {
	ft = 'ft',
	mps = 'mps',
	htapg = 'htapg'
}

export interface webinarData {
	id: number;
	schedule: number;
	date_time: string;
	name: string;
	updated: string;
}
