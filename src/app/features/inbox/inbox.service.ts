import { AppointmentDetails } from './../scheduler/model/model';
import { AppService } from './../../app.service';
import { ApiConstants } from './../../api.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAppointmentContextReq, IAppointmentContextRes, IInbox, STATUS } from './models/inbox-models';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  inboxList: any[] = [
    {
      fromName : "Ankit Sawant",
      message : "Appointment Request",
      time : "12:12",
      date : "12-05-2021",
      appointmentId : "A12345"
    },
    {
      fromName : "Kamlesh Badgujar",
      message : "Appointment Request",
      time : "12:00",
      date : "12-05-2021",
      appointmentId : "A12346"
    },
    {
      fromName : "Pranav Ekapure",
      message : "Appointment Request",
      time : "11:30",
      date : "12-05-2021",
      appointmentId : "A12347"
    },
    {
      fromName : "Sanket Chanudhari",
      message : "Appointment Request",
      time : "11:20",
      date : "12-05-2021",
      appointmentId : "A12348"
    },
    {
      fromName : "Shriya Khatri",
      message : "Appointment Request",
      time : "10:00",
      date : "12-05-2021",
      appointmentId : "A12349"
    }
  ];

  constructor(private httpClient: HttpClient,
              private appSvc : AppService) { }

  getAllInboxByuser(reqObj: any): Observable<any> {
    const url = ApiConstants.generateDynamicEndpoint('inboxEndpoint', 'getMail');
    return this.appSvc.PostWithoutResponseCode(url, reqObj)
    return of(this.inboxList);
  }

  getAppointmentById(appointmentId: string): Observable<any> {
    // const mailDetails = this.inboxList.find(mail => mail.appointmentId === appointmentId);
    const dummy = {
      "appointmentId": "A12345",
      "physicianId": "10",
      "patientId": "140",
      "date": "2021-12-15",
      "startTime": "17:42:12",
      "endTime": "00:00:00",
      "status": "PENDING",
      "description": "New appointment",
      "reasonForChange": null,
      "patientVisitDetailId": null
    }
    const url = ApiConstants.generateDynamicEndpoint('appointmentEndpoint', 'appointmentById', appointmentId);
    return of(dummy);
  }

  appointmentSubmission(appointment: any): Observable<any> {
    return of({ status: 200, message: 'Appointment accepted' })
  }

  editAppointment(appointment : AppointmentDetails){
    const appointmentId = appointment.appointmentId
    const url = ApiConstants.generateDynamicEndpoint('appointmentEndpoint', 'editAppointment', appointmentId);
    return this.appSvc.Put(url, appointment);
  }

  sendMail(reqObj) {
    const url = ApiConstants.generateDynamicEndpoint('inboxEndpoint', 'sendMail');
    return this.appSvc.Post(url, reqObj);
  }
}
