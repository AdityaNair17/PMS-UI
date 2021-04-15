import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InboxService } from '../../inbox.service';
import { IInbox } from '../../models/inbox-models';

@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.scss']
})
export class InboxListComponent implements OnInit {
  @Input() inboxList: IInbox[];
  @Output() logMailId: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getMailRowDetails(id: string){
    this.logMailId.emit(id);
  }

}
