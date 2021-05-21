import { AppService } from './../../../app.service';
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
  medicationUrl : string = "http://40.76.198.123:8080/medication/";
  procedureUrl : string = 'http://13.90.116.138:8080/healthcare/procedure/';
  diagnosisUrl : string = 'http://13.90.116.138:8081/healthcare/diagnosis/';

  constructor(private http : HttpClient,
              private appSvc : AppService) { }


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
    // return of((medicationList as any).default);
    const url  = `${this.medicationUrl}getList`
    return this.http.get(url);
  }


  getMedicationDetailsById(){
    // const url  = `http://23.96.121.152:8080/medication/getList/${this.visitId}/${this.patientId}`;
    const url = `${this.medicationUrl}getList/${this.visitId}/${this.patientId}`;
    return this.http.get(url);

    // return of((medicationById as any).default);

  }

  getProcedureList(){
    const url = `${this.procedureUrl}getallProcedure`;
    return this.appSvc.Get(url);
    return of((procedureList as any).default);
  }

  getProcedureDetailsById(){
    const url = `${this.procedureUrl}${this.visitId}`;
    return this.appSvc.Get(url);
    return of((procedureById as any).default);
  }

  
  postProcedure(reqObj : any){
    console.log(reqObj);
    const url = `${this.procedureUrl}procedureDetailDesc`;
    return this.appSvc.PostWithoutResponseCode(url, reqObj);
  }

  getDiagnosisList(){
    const url = `${this.diagnosisUrl}getalldiagnosis`;
    return this.appSvc.Get(url);
    return of((diagnosisList as any).default);
  }

  getDiagnosisById(){
    const url = `${this.diagnosisUrl}${this.visitId}`;
    return this.appSvc.Get(url);
    return of((diagnosisById as any).default);
  }

  
  postDiagnosis(reqObj : any){
    console.log(reqObj);
    const url = `${this.diagnosisUrl}diagnosisDetailDesc`;
    return this.appSvc.PostWithoutResponseCode(url,reqObj);
  }

  getVitalsById(){
    return of((vitalsById as any).default);
  }

  postMedication(reqBody : any){
    // const url = 'http://23.96.121.152:8080/medication/saveList';
    const url = this.medicationUrl + 'saveList'
    return this.http.post(url, reqBody);
  }


}
