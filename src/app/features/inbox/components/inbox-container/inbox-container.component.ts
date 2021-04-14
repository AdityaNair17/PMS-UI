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
  constructor(
    private inboxService: InboxService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllInbox('ankit@gmail.com');
  }

  getAllInbox(user: string) {
    this.inboxService.getAllInboxByuser(user)
      .subscribe((inboxList) => {
        this.inboxList = inboxList;
      });
  }

  getMailId(id: string) {
    console.log(id);
    this.vissible = true;
    console.log(this.vissible)
  }

  onDialogClose(event) {
    this.vissible = event;
 }

}
