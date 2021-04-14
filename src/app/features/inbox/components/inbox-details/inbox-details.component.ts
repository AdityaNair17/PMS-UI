import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IInbox } from '../../models/inbox-models';

@Component({
  selector: 'app-inbox-details',
  templateUrl: './inbox-details.component.html',
  styleUrls: ['./inbox-details.component.scss']
})
export class InboxDetailsComponent implements OnInit {
  @Input() vissible: boolean;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  @Input() mailDetails: IInbox;
  constructor() { }

  ngOnInit(): void {
  }


  onAccept() {
    this.displayChange.emit(false)
  }

  onReject() {
    this.displayChange.emit(false)
  }

}
