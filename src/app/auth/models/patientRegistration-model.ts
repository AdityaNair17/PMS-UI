import { IUser } from "./user-model";


export interface IPatientRegistrationReq extends IUser {
    title: string;
    contactNumber: string;
    password: string;
}

export interface IPatientRegistrationRes {
    status: number;
    message: number
}