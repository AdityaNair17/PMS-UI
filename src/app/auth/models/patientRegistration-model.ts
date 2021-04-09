import { IResponse } from "./masterResObj-model";
import { IUser } from "./user-model";


export interface IPatientRegistrationReq extends IUser {
    contactNumber: string;
    password: string;
    confirmPassword: string;
}

export interface IPatientRegistrationRes extends IResponse {

}