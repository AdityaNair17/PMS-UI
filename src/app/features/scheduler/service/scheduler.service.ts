import { of } from 'rxjs';
import { AppService } from './../../../app.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as appointmentList from '../../../../assets/json/calendarAppointmentList.json';
import * as appointmentList2 from '../../../../assets/json/calendarAppointmentList2.json';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

constructor(private http: HttpClient,
            private appSvc : AppService,
            private modal : NgbModal) { }

getListOfAppointments(requestBody : any) {
  console.log(requestBody);

  return of((appointmentList as any).default);

  }


  randomCall(){
    console.log("called");
    return this.appSvc.Get('http://localhost:3000/data');

  }

  openAppointmentList(component : any){
    this.modal.open(component,{ backdrop: 'static'});
  }
}
