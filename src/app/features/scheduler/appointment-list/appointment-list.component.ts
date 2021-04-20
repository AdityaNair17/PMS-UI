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
              private authSvc : AuthService) { }


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
}
