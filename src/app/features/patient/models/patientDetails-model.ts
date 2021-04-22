import { IResponse } from "src/app/auth/models/masterResObj-model";

export interface IPatientDetailsRes extends IResponse {
    id?: string;
}

export interface ILanguageKnown {
    id?: number;
    name?: string;
}

export interface IAllergies {
    id?: number;
    type?: string;
    isFatal?: boolean;
}

export interface IPatient {
    id?: string;
    basicDetails?: IBasicDetails;
    address?: IAddress;
    emergencyDetails?: IEmergencyDetails;
    languageKnown?: ILanguageKnown;
    allergies?: IAllergies;
}

export interface IBasicDetails {
    id?: string;
    firstName?: string;
    lastName?: string;
    emailId?: string;
    dateOfBirth?: string;
    contactNo?: string;
    age?: string;
    gender?: string;
    race?: string;
    ethnicity?: string;
}

export interface IEmergencyDetails {
    id?: string;
    emergency_first_name?: string;
    emergency_last_name?: string;
    emergency_relation_ship?: string;
    emergency_contact_number?: string;
    mailId?: string;
    _access_approved?: string;
    _same_address?: string;
}

export interface IAddress {
    id?: string;
    landmarkArea?: string;
    city?: string;
    state?: string;
    country?: string;
    pin?: string;
    addressType?: string;
}