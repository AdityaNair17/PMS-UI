

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
    Upcoming = 0,
    Accepted = 1,
    Rejected = 2
}