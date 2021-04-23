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

  constructor(public activeModal: NgbActiveModal,
              private schedulerSvc : SchedulerService,
              private authSvc : AuthService,
              private toastMessageSvc : ToastMessageService) { }


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
    if(this.appointmentToBeDeleted.appointmentId == appointmentId){
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
    console.log(appointment);
  }

  createVisit(appointment, event){
    event.stopPropagation();
    console.log(appointment);
  }
}
