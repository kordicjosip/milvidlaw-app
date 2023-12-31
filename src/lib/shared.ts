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
	webinar_id: string | number;
	schedule: string | number;
	first_name: string;
	last_name: string;
	phone: string;
	email: string;
}

interface CustomField {
	id: number;
	value: string;
}

export interface lawmaticsRegisterRequest {
	first_name: string;
	last_name: string;
	match_contact_by: string;
	email: string;
	phone: string;
	practice_area_id: number;
	custom_fields: CustomField[];
}

export interface webinarRegisterDatabase {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	webinar: string;
	ew_live: string;
	ew_replay: string;
}
