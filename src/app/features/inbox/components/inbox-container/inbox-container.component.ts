import { STATUS } from './../../models/inbox-models';
import { AppointmentDetails } from './../../../scheduler/model/model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast/service/toastMessage.service';
import { toastErrMessage, toastSuccMessage } from 'src/app/shared/constants/constants';
import { InboxService } from '../../inbox.service';
import { IAppointmentContextReq, IInbox } from '../../models/inbox-models';

@Component({
  selector: 'app-inbox-container',
  templateUrl: './inbox-container.component.html',
  styleUrls: ['./inbox-container.component.scss']
})
export class InboxContainerComponent implements OnInit {
  inboxList: IInbox[] = [];
  vissible: boolean = false;
  mailDetails: IInbox = null;
  constructor(
    private inboxService: InboxService,
    private authService: AuthService,
    private toastMessageSvc: ToastMessageService,
  ) { }

  ngOnInit(): void {
    this.getAllInbox(this.authService.User.id);
  }

  getAllInbox(user: string) {
    const reqBody = {
      toId : this.authService.User.id,
      role : this.authService.UserRole
    }
    this.inboxService.getAllInboxByuser(reqBody)
      .subscribe((inboxList) => {
        // inboxList.forEach(ib => {
        //   const date = new Date(ib.date);
        //   ib.date = date.getDate();
        //   ib.time = date.getHours() + ':' + date.getMinutes();
        // })
        this.inboxList = inboxList;
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage);
      });
  }

  getMailId(id: string) {
    this.inboxService.getAppointmentById(id)
      .subscribe((mail) => {
        this.mailDetails = mail;
        this.vissible = true;
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage);
      });
  }

  logAppointment(appointmentDetails: AppointmentDetails) {
    this.inboxService.editAppointment(appointmentDetails).subscribe((resp) => {
      if(resp.status == 200){
        const message = {
          severity : "success",
          summary : appointmentDetails.status == STATUS.ACCEPTED ? 'Appointment Accepted' : 'Appointment Rejected'
        }
        this.toastMessageSvc.displayToastMessage(message);
      }
    });

    const reqObj = {
      key : {
        toId : appointmentDetails.patientId,
        toName : appointmentDetails.patientName,
        fromId : this.authService.User.id,
        fromName : this.authService.User.fullName
      },
      value : {
        message : appointmentDetails.status == STATUS.ACCEPTED ? 'Appointment Accepted' : 'Appointment Rejected',
        isNurse : appointmentDetails.status == STATUS.ACCEPTED ? true : false,
        appointmentId : appointmentDetails.appointmentId
      }
    }



    this.inboxService.appointmentSubmission(reqObj)
      .subscribe((appointment) => {
        console.log(appointment);
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage);
      });
  }

  onDialogClose(dialogCloseFlag: boolean) {
    this.vissible = dialogCloseFlag;
  }


}
