import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllInbox(this.authService.User.emailId);
  }

  getAllInbox(user: string) {
    this.inboxService.getAllInboxByuser(user)
      .subscribe((inboxList) => {
        this.inboxList = inboxList;
      });
  }

  getMailId(id: string) {
    this.vissible = true;
    this.inboxService.getMailById(id)
      .subscribe((mail) => {
        this.mailDetails = mail;
      })
  }

  onDialogClose(dialogCloseFlag: boolean) {
    this.vissible = dialogCloseFlag;
  }

}
