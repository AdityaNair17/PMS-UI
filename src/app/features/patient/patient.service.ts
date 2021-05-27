import { ApiConstants } from './../../api.constants';
import { HttpResponse } from '@angular/common/http';
import { AppService } from './../../app.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAllergies, ILanguageKnown, IPatient, IPatientDetailsRes } from './models/patientDetails-model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private appSvc : AppService) { }

  addPatientDetils(patientDetails: any) : Observable<any>{
    const url = ApiConstants.generateDynamicEndpoint('visitAndPatientEndpoint', 'addPatient');
    return this.appSvc.Post(url, patientDetails);
    // return of({ id: '456fdsdfhjjtrdsaw35789', status: 200, message: 'Patient details added Successfully' })
  }

  updatePatientDetails(patientDetails: any) {
    const url = ApiConstants.generateDynamicEndpoint('visitAndPatientEndpoint', 'updatePatient');
    return this.appSvc.Put(url, patientDetails);  
  }

  getLanguageKnownList(): Observable<any> {
    const languages: ILanguageKnown[] = [
      { id: 1, name: 'Hindi' },
      { id: 2, name: 'English' },
      { id: 3, name: 'Mandarin' }
    ];
    const url = ApiConstants.generateDynamicEndpoint('visitAndPatientEndpoint', 'listOfLanguages');
    return this.appSvc.Get(url);
    // return of(languages)
  }

  getAllergies(): Observable<any> {
    const allergies: IAllergies[] = [{ id: 1, type: 'Drug', isFatal: true }];
    const url = ApiConstants.generateDynamicEndpoint('visitAndPatientEndpoint','listOfAllergies');
    return this.appSvc.Get(url);
    // return of(allergies);
  }

  getPatient(patientId : string): Observable<any> {
    const patient = {
      "id": "CT62d98519-5e20-482d-817a-a6330aca531a",
      "basicDetails": {
        "id": "206",
        "firstName": "Ravikumar",
        "lastName": "Jadhav",
        "emailId": "m10@gmail.com",
        "dateOfBirth": "1985-01-30",
        "contactNo": "9090909090",
        "age": 36.0,
        "gender": "Male",
        "race": "Ashian",
        "ethnicity": "Test"
      },
      "emergencyDetails": {
        "id": "207",
        "emergency_first_name": "Amar",
        "emergency_last_name": "Shinde",
        "emergency_relation_ship": "Friend",
        "emergency_contact_number": "9898989898",
        "mailId": "test10@gmail.com",
        "_access_approved": true,
        "_same_address": true
      },
      "address": {
        "id": "211",
        "landmarkArea": "Sadarbazar Peth",
        "city": "Satara",
        "state": "Maharashtra",
        "country": "India",
        "pin": 415001,
        "addressType": "HOME_ADDRESS",
      },
      "languageKnown": [
        { id: 1, name: 'Hindi' },
        { id: 2, name: 'English' },
        { id: 3, name: 'Mandarin' }
      ],
      "allergies": [
        {
          "id": 1,
          "type": "DUST",
          "fatal": false
        },
        {
          "id": 2,
          "type": "FOOD",
          "fatal": false
        }
      ]
    }
    const url = ApiConstants.generateDynamicEndpoint('visitAndPatientEndpoint', 'patientById', patientId);
    return this.appSvc.Get(url);
    return of(JSON.parse(JSON.stringify(patient)));
  }

  getAllPatients(user?: string): Observable<any> {
    const data = [
      {
        "id": "CT62d98519-5e20-482d-817a-a6330aca531a",
        "basicDetails": {
          "id": "206",
          "firstName": "Ravikumar",
          "lastName": "Jadhav",
          "emailId": "m10@gmail.com",
          "dateOfBirth": "1985-01-30",
          "contactNo": "9090909090",
          "age": 36.0,
          "gender": "male",
          "race": "Ashian",
          "ethnicity": "Test"
        },
        "emergencyDetails": {
          "id": "207",
          "emergency_first_name": "Amar",
          "emergency_last_name": "Shinde",
          "emergency_relation_ship": "Friend",
          "emergency_contact_number": "9898989898",
          "mailId": "test10@gmail.com",
          "_access_approved": true,
          "_same_address": true
        },
        "address": {
          "id": "211",
          "landmarkArea": "Sadarbazar Peth",
          "city": "Satara",
          "state": "Maharashtra",
          "country": "India",
          "pin": 415001,
          "addressType": "HOME_ADDRESS",
        },
        "languageKnown": [
          {
            "id": 2,
            "name": "Hindi"
          },
          {
            "id": 1,
            "name": "Marathi"
          }
        ],
        "allergies": [
          {
            "id": 1,
            "type": "DUST",
            "fatal": false
          },
          {
            "id": 2,
            "type": "FOOD",
            "fatal": false
          }
        ]
      },
      {
        "id": "CT63450f70-f9bb-47d7-9866-b95df17e8448",
        "basicDetails": {
          "id": 209,
          "firstName": "om",
          "lastName": "shide",
          "emailId": "m11@gmail.com",
          "dateOfBirth": "1985-01-30",
          "contactNo": 9090909090,
          "age": 36.0,
          "gender": "male",
          "race": "Ashian",
          "ethnicity": "Test"
        },
        "emergencyDetails": {
          "id": 210,
          "emergency_first_name": "Amar",
          "emergency_last_name": "Shinde",
          "emergency_relation_ship": "Friend",
          "emergency_contact_number": 9898989898,
          "mailId": "test11@gmail.com",
          "_access_approved": true,
          "_same_address": true
        },
        "address":
        {
          "id": 211,
          "landmarkArea": "Sadarbazar Peth",
          "city": "Satara",
          "state": "Maharashtra",
          "country": "India",
          "pin": 415001,
          "addressType": "HOME_ADDRESS",
        },
        "languageKnown": [
          {
            "id": 2,
            "name": "Hindi"
          },
          {
            "id": 1,
            "name": "Marathi"
          }
        ],
        "allergies": [
          {
            "id": 2,
            "type": "FOOD",
            "fatal": false
          },
          {
            "id": 4,
            "type": "PET",
            "fatal": false
          }
        ]
      }
    ];
    // const patients = JSON.parse(JSON.stringify(data)) as IPatient[];
    const url = ApiConstants.generateDynamicEndpoint('visitAndPatientEndpoint', 'getAllPatients')
    return this.appSvc.Get(url);
    // return of(patients)
  }

  upatedPatientDetailsRequirement(isPasswordChangeRequired : boolean, isPersonalDetailsRequired : boolean, userId : string){
    const url = ApiConstants.generateDynamicEndpoint('authenticationEndpoint', 'updatePatientDetailCall', isPasswordChangeRequired, isPersonalDetailsRequired, userId);
    return this.appSvc.Put(url, {});
  }
}
