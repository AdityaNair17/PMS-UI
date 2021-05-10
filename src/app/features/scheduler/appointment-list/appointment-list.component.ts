import { VisitDetails } from './../../patient-visit/model/model';
import { AppService } from './../../../app.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { toastSuccMessage, toastErrMessage } from 'src/app/shared/constants/constants';
import { ToastMessageService } from 'src/app/shared/components/toast/service/toastMessage.service';
import { CreateAppointmentComponent } from './../create-appointment/create-appointment.component';
import { AuthService } from 'src/app/auth/auth.service';
import { SchedulerService } from './../service/scheduler.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  
  selectedDate: Date;
  appointments : any[];
  showDeleteConfirmationDialog : boolean = false;
  appointmentToBeDeleted : any;
  deletionReason : string = "";

  constructor(public activeModal: NgbActiveModal,
              private schedulerSvc : SchedulerService,
              private authSvc : AuthService,
              private toastMessageSvc : ToastMessageService,
              private router : Router,
              private appSvc : AppService) { }


  ngOnInit(): void {
    this.selectedDate = this.schedulerSvc.selectedDate

    this.GetListOfAppointments();
  }


  GetListOfAppointments() {
    const reqBody = {
      emailId: this.authSvc.User.emailId,
      date: this.schedulerSvc.FormatDate(this.selectedDate)
    }

    this.schedulerSvc.getListOfAppointmentsForSelectedDate(reqBody).subscribe(appointments => {

      this.appointments = appointments;
      console.log(this.appointments);
    })
  }

  deleteAppointment(){
    console.log(this.appointmentToBeDeleted);   
  }

  showDeleteDialog(appointment, event){
    this.appointmentToBeDeleted = appointment;
    this.showDeleteConfirmationDialog = true;
  }

  cancelDeleteDialog(appointmentId) {
    if(this.appointmentToBeDeleted &&  this.appointmentToBeDeleted.appointmentId == appointmentId){
    this.showDeleteConfirmationDialog = false;
    this.appointmentToBeDeleted = null;
    }
  }

  editAppointment(appointment, event){
    event.stopPropagation()
    const modal = this.schedulerSvc.createEditAppointment(CreateAppointmentComponent,"edit",appointment);
    modal.result.then((response) => {
      if(response){
        if(response.status == 200){
          this.toastMessageSvc.displayToastMessage(toastSuccMessage);
        } else {
          this.toastMessageSvc.displayToastMessage(toastErrMessage);
        }
        this.GetListOfAppointments();
      }
    })
  }


  viewVisit(appointment, event){
    event.stopPropagation();
    console.log(appointment)
    this.activeModal.close();
    this.appSvc.previousUrl = 'layout/home/scheduler';
    
    const visitObj : VisitDetails = {
      patientId : appointment.patientId,
      patientName : appointment.patientName,
      visitId : appointment.patientVisitDetailId,
      physcianName : appointment.physcianName,
      appointmentDate : appointment.date
    }
    this.router.navigate(['layout/visit', {appointmentDetails : JSON.stringify(visitObj), isEdit : JSON.stringify(true) }]);
  }

  createVisit(appointment, event){
    event.stopPropagation();
    console.log(appointment);
    this.activeModal.close();
    this.appSvc.previousUrl = 'layout/home/scheduler';
    // An API call will be made here to generate visitID
    const visitObj : VisitDetails = {
      patientId : appointment.patientId,
      patientName : appointment.patientName,
      visitId : appointment.patientVisitDetailId,
      physcianName : appointment.physcianName,
      appointmentDate : appointment.date
    }
    this.router.navigate(['layout/visit', {appointmentDetails : JSON.stringify(visitObj), isEdit : JSON.stringify(false) }]);

  }

  dateChange(date){
    this.selectedDate = date;
    this.GetListOfAppointments();

  }
}
