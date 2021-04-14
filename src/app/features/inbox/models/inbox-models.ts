

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
    REJECTED = 'Rejected'
}