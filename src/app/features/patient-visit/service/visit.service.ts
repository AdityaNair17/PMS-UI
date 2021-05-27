import { ApiConstants } from './../../../api.constants';
import { AppService } from './../../../app.service';
import { VisitDetails } from './../model/model';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
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
    const url = ApiConstants.generateDynamicEndpoint('medicationEndpoint', 'listOfMedications');
    return this.http.get(url);
  }


  getMedicationDetailsById(){
    const url = ApiConstants.generateDynamicEndpoint('medicationEndpoint', 'medicationById', this.visitId, this.patientId);
    return this.http.get(url);


  }

  postMedication(reqBody : any){
    const url = ApiConstants.generateDynamicEndpoint('medicationEndpoint', 'createMedication');
    return this.http.post(url, reqBody);
  }

  getProcedureList() : Observable<any>{
    const url = ApiConstants.generateDynamicEndpoint('procedureEndpoint', 'listOfProcedures');
    return this.appSvc.Get(url);
  }

  getProcedureDetailsById() : Observable<any>{
    const url = ApiConstants.generateDynamicEndpoint('procedureEndpoint', 'procedureById', this.visitId);
    return this.appSvc.Get(url);
  }

  
  postProcedure(reqObj : any){
    const url = ApiConstants.generateDynamicEndpoint('procedureEndpoint', 'createProcedure');
    return this.appSvc.PostWithoutResponseCode(url, reqObj);
  }

  getDiagnosisList() : Observable<any>{
    const url = ApiConstants.generateDynamicEndpoint('diagnosisEndpoint','listOfDiagnosis');
    return this.appSvc.Get(url);
  }

  getDiagnosisById() : Observable<any>{
    const url = ApiConstants.generateDynamicEndpoint('diagnosisEndpoint', 'diagnosisById', this.visitId);
    return this.appSvc.Get(url);
  }

  
  postDiagnosis(reqObj : any){
    const url = ApiConstants.generateDynamicEndpoint('diagnosisEndpoint', 'createDiagnosis');
    return this.appSvc.PostWithoutResponseCode(url,reqObj);
  }

  getVitalsById() : Observable<any>{
    const url = ApiConstants.generateDynamicEndpoint('vitalEndpoint', 'getVitalsById', this.visitId);
    return this.appSvc.Get(url)
  }

  addVitals(reqObj){
    const url = ApiConstants.generateDynamicEndpoint('vitalEndpoint', 'addVitals');
    return this.appSvc.PostWithoutResponseCode(url, reqObj);
  }


}
