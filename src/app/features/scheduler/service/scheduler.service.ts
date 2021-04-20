import { of } from 'rxjs';
import { AppService } from './../../../app.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as appointmentList from '../../../../assets/json/calendarAppointmentList.json';
import * as appointmentList2 from '../../../../assets/json/calendarAppointmentList2.json';
import * as appointmentDetails from '../../../../assets/json/listOfAppointmentDetails.json';
import * as patientList from '../../../../assets/json/listOfPatients.json';
import * as doctorList from '../../../../assets/json/listOfDoctors.json';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  public selectedDate: Date;
  constructor(private http: HttpClient,
    private appSvc: AppService,
    private modal: NgbModal) { }

  getListOfAppointments(requestBody: any) {
    console.log(requestBody);

    return of((appointmentList as any).default);

  }


  getListOfAppointmentsForSelectedDate(requestBody: any){
    console.log(requestBody);
    return of((appointmentDetails as any).default);
  }
  randomCall() {
    console.log("called");
    return this.appSvc.Get('http://localhost:3000/data');

  }

  openAppointmentList(component: any) {
    this.modal.open(component, { backdrop: 'static' });
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
    return of((patientList as any).default);
  }

  getListOfDoctors(){
    return of((doctorList as any).default);
  }
}
