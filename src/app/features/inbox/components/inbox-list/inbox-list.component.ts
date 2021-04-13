import { Component, Input, OnInit } from '@angular/core';
import { InboxService } from '../../inbox.service';
import { IInbox } from '../../models/inbox-models';

@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.scss']
})
export class InboxListComponent implements OnInit {
  @Input() inboxList: IInbox[];
  cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
