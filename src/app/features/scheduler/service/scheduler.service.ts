import { ApiConstants } from './../../../api.constants';
import { of, Observable } from 'rxjs';
import { AppService } from './../../../app.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as appointmentList from '../../../../assets/json/calendarAppointmentList.json';
import * as appointmentList2 from '../../../../assets/json/calendarAppointmentList2.json';
import * as appointmentDetails from '../../../../assets/json/listOfAppointmentDetails.json';
import * as patientList from '../../../../assets/json/listOfPatients.json';
import * as doctorList from '../../../../assets/json/listOfDoctors.json';
import * as timeSlots from '../../../../assets/json/appointmentTimes.json';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  public selectedDate: Date;
  public appointmentMode : string;
  public selectedAppointment : any;
  private baseUrl : string = "http://13.90.38.170:8082/appointment"
  private visitUrl : string = "http://13.90.38.170:8082/healthcare/";

  constructor(private http: HttpClient,
    private appSvc: AppService,
    private modal: NgbModal) { }

  getListOfAppointments(requestBody: any) {
    console.log(requestBody);
    // const url = `${this.baseUrl}/byuseridandwithindate`;
    const url = ApiConstants.generateDynamicEndpoint('appointmentEndpoint','appointmentList');
    const param = {
      userId : requestBody.emailId,
      startDate : requestBody.startDate,
      endDate : requestBody.endDate
    }    
    // return of((appointmentList as any).default);
    return this.appSvc.Get(url, param)

  }


  getListOfAppointmentsForSelectedDate(requestBody: any){
    console.log(requestBody);
    // const url = `${this.baseUrl}/byuseridanddate`;
    const url = ApiConstants.generateDynamicEndpoint('appointmentEndpoint', 'appointmentListByDate');
    const param = {
      userId : requestBody.emailId,
      date : requestBody.date
    }
    // return of((appointmentDetails as any).default);
    return this.appSvc.Get(url,param);

  }


  randomCall() {
    console.log("called");
    return this.appSvc.Get('http://localhost:3000/data');

  }

  openAppointmentList(component: any) {
    this.modal.open(component, { backdrop: 'static' });
  }

  createEditAppointment(component : any, mode : string = "add", appointment? : any){
    this.appointmentMode = mode;
    if(appointment){
      this.selectedAppointment = appointment;
    }
    return this.modal.open(component, {backdrop : 'static'});
  }
  
  FormatDate(fullDate: Date) {
    let date: any = fullDate.getDate();
    date = date >= 10 ? date : `0${date}`;

    let month: any = fullDate.getMonth() + 1;
    month = month >= 10 ? month : `0${month}`;

    const year = fullDate.getFullYear();

    return `${year}-${month}-${date}`;

  }


  getListOfPatients(){
    const url = ApiConstants.generateDynamicEndpoint('authenticationEndpoint', 'getUserByRole', 'Patient');
    // return this.appSvc.Get(url, 'Patient');
    return of((patientList as any).default);
  }

  getListOfDoctors(){
    const url = ApiConstants.generateDynamicEndpoint('authenticationEndpoint', 'getUserByRole', 'Doctor');
    return this.appSvc.Get(url);
    return of((doctorList as any).default);
  }

  getTimeSlots(){
    return of((timeSlots as any).default);
  }

  createAppointment(reqObj) : Observable<HttpResponse<String>>{
    console.log(JSON.stringify(reqObj));
    const respStatus = {
      status : 200
    }
    // const url = `${this.baseUrl}`;
    const url = ApiConstants.generateDynamicEndpoint('appointmentEndpoint', 'createAppointment');
    // return of(respStatus);
    return this.appSvc.Post(url,reqObj);
  }

  editAppointment(reqObj, appointmentId : string){
    console.log(JSON.stringify(reqObj));
    const respStatus = {
      status : 200
    }
    // const url = `${this.baseUrl}/${appointmentId}`
    const url = ApiConstants.generateDynamicEndpoint('appointmentEndpoint', 'editAppointment', appointmentId);
    return this.appSvc.Put(url, reqObj);
    return of(respStatus);
  }

  deleteAppointment(appointmentId : string){
    // const url = `${this.baseUrl}/${appointmentId}/CANCELLED`;
    const url = ApiConstants.generateDynamicEndpoint('appointmentEndpoint', 'deleteAppointment', appointmentId)
    return this.appSvc.DeleteAppointment(url);
  }

  createVisitId(reqObj) : Observable<any>{
    // const url = `${this.visitUrl}visit/createvisit/`;
    const url = ApiConstants.generateDynamicEndpoint('visitAndPatientEndpoint','createVisit');
    return this.appSvc.PostWithoutResponseCode(url, reqObj);
  }

  sendMail(reqObj) {
    const url = ApiConstants.generateDynamicEndpoint('inboxEndpoint', 'sendMail');
    return this.appSvc.Post(url, reqObj);
  }
}
