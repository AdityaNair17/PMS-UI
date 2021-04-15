import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast/service/toastMessage.service';
import { toastErrMessage } from 'src/app/shared/constants/constants';
import { InboxService } from '../../inbox.service';
import { IInbox } from '../../models/inbox-models';

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
    this.getAllInbox(this.authService.User.emailId);
  }

  getAllInbox(user: string) {
    this.inboxService.getAllInboxByuser(user)
      .subscribe((inboxList) => {
        this.inboxList = inboxList;
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage);
      });
  }

  getMailId(id: string) {
    this.vissible = true;
    this.inboxService.getMailById(id)
      .subscribe((mail) => {
        this.mailDetails = mail;
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage);
      });
  }

  onDialogClose(dialogCloseFlag: boolean) {
    this.vissible = dialogCloseFlag;
  }

}
