import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPatientDetailsRes } from './models/patientDetails-model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  addPatientDetils(patientDetails: any): Observable<IPatientDetailsRes> {
    return of({ id: '456fdsdfhjjtrdsaw35789', status: 200, message: 'password changed Successfully' })
  }
}
