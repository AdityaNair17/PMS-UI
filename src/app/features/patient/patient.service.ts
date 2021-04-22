import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAllergies, ILanguageKnown, IPatientDetailsRes } from './models/patientDetails-model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  addPatientDetils(patientDetails: any): Observable<IPatientDetailsRes> {
    return of({ id: '456fdsdfhjjtrdsaw35789', status: 200, message: 'Patient details added Successfully' })
  }

  getLanguageKnownList(): Observable<ILanguageKnown[]> {
    const languages: ILanguageKnown[] = [
      { id: 1, name: 'Hindi' },
      { id: 2, name: 'English' },
      { id: 3, name: 'Mandarin' }
    ];
    return of(languages)
  }

  getAllergies(): Observable<IAllergies[]> {
    const allergies: IAllergies[] = [{ id: 1, type: 'Drug', isFatal: true }];
    return of(allergies);
  }
}
