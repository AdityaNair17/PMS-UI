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
    appointmentId: string;
    status: STATUS;
}

export enum STATUS{
    UPCOMING = 'UPCOMING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED'
}

export interface IAppointmentContextRes extends IResponse{}
   