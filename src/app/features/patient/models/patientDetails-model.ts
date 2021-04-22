import { IResponse } from "src/app/auth/models/masterResObj-model";

export interface IPatientDetailsRes extends IResponse {
id?:string;
}

export interface ILanguageKnown{
    id?: number;
    name?: string;
}

export interface IAllergies{
    id?: number;
    type?: string;
    isFatal?: boolean;
}