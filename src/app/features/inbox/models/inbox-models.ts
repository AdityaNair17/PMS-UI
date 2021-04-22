import { IResponse } from "src/app/auth/models/masterResObj-model";


export interface IInbox{
    id: string;
    name: string;
    type: string;
    subject: string;
    status: STATUS;
    time: string;
    date: string;
}

export interface IAppointmentContextReq{
    id: string;
    status: STATUS;
}

export enum STATUS{
    UPCOMING = 'Upcoming',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
    PENDING = 'Approval Pending'
}

export interface IAppointmentContextRes extends IResponse{}
   