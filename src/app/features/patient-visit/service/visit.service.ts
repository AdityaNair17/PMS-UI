import { VisitDetails } from './../model/model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as medicationList from '../../../../assets/json/medicationList.json';
import * as medicationById from '../../../../assets/json/medicationById.json';
import * as procedureList from '../../../../assets/json/procedureList.json';
import * as procedureById from '../../../../assets/json/procedureById.json';
import * as diagnosisList from '../../../../assets/json/diagnosisList.json';
import * as diagnosisById from '../../../../assets/json/diagnosisById.json';
import * as vitalsById from '../../../../assets/json/vitals.json';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private visitId : string = null;
  private patientId : string = null;
  private appointmentDetails : VisitDetails;
  public isEdit : boolean = true;

  constructor(private http : HttpClient) { }


  public get VisitId(){
    return this.visitId;
  }

  public set VisitId(id : string){
    this.visitId = id;
  }

  public get PatientId(){
    return this.patientId;
  }

  public set PatientId(id : string){
    this.patientId = id;
  }


  public get AppointmentDetails(){
    return this.appointmentDetails;
  }

  public set AppointmentDetails(appointment : VisitDetails){
    this.appointmentDetails = appointment;
  }

  getMedicationList(){
    return of((medicationList as any).default);
    // const url  = 'http://23.96.121.152:8080/medication/getList';
    // return this.http.get(url);
  }


  getMedicationDetailsById(){
    // const url  = 'http://23.96.121.152:8080/medication/getList/' + this.visitId + '/' + this.patientId;
    // return this.http.get(url);

    return of((medicationById as any).default);

  }

  getProcedureList(){
    return of((procedureList as any).default);
  }

  getProcedureDetailsById(){
    return of((procedureById as any).default);
  }

  getDiagnosisList(){
    return of((diagnosisList as any).default);
  }

  getDiagnosisById(){
    return of((diagnosisById as any).default);
  }

  getVitalsById(){
    return of((vitalsById as any).default);
  }

  postMedication(reqBody : any){
    const url = 'http://23.96.121.152:8080/medication/saveList';
    return this.http.post(url, reqBody);
  }
}
