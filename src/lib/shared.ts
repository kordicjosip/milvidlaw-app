export enum webinarTypes {
    ft = 'ft',
    mps = 'mps',
    htapg = 'htapg',
}

export interface webinarData {
    id: number;
    scheduleId: number;
    time: string;
    name: string;
    lastUpdated: string;
}
