import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAppointmentContextReq, IInbox, STATUS } from '../../models/inbox-models';

@Component({
  selector: 'app-inbox-details',
  templateUrl: './inbox-details.component.html',
  styleUrls: ['./inbox-details.component.scss']
})
export class InboxDetailsComponent implements OnInit {
  @Input() vissible: boolean;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  @Output() logAppointment: EventEmitter<IAppointmentContextReq> = new EventEmitter();
  @Input() mailDetails: IInbox;
  constructor() { }

  ngOnInit(): void {
  }


  onAccept(id: string) {
    this.displayChange.emit(false);
    this.logAppointment.emit({status: STATUS.ACCEPTED, id: id})
  }

  onReject(id: string) {
    this.displayChange.emit(false);
    this.logAppointment.emit({status: STATUS.REJECTED, id: id})
  }

  onClose() {
    this.displayChange.emit(false)
  }

}
