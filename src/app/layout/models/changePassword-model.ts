import { IResponse } from "src/app/auth/models/masterResObj-model";

export interface IChangePasswordReq{
    emailId?: string;
    oldPassword?: string;
    confirmNewPassword?: string;
}

export interface IChangePasswordRes extends IResponse{

}

