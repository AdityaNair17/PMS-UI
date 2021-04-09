import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPatientRegistrationReq, IPatientRegistrationRes } from './models/patientRegistration-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  patientRegistration(patientDetails: IPatientRegistrationReq): Observable<IPatientRegistrationRes> {
    return of({ status: 200, message: 'Registered Successfully' })
  }
}
