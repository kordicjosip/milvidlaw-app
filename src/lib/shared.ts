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

export interface webinarRegisterRequest {
	api_key: string;
	webinar_id: number;
	schedule: number;
	first_name: string;
	last_name: string;
	phone: string;
	email: string;
}
