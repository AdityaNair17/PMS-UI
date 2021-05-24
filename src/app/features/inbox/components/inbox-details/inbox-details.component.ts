import { AppointmentDetails } from './../../../scheduler/model/model';
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
  @Output() logAppointment: EventEmitter<AppointmentDetails> = new EventEmitter();
  @Input() mailDetails: AppointmentDetails;
  constructor() { }

  ngOnInit(): void {
  }


  onAccept() {
    this.mailDetails.status = STATUS.ACCEPTED;
    this.displayChange.emit(false);
    this.logAppointment.emit(this.mailDetails)
  }

  onReject() {
    this.mailDetails.status = STATUS.REJECTED;
    this.displayChange.emit(false);
    this.logAppointment.emit(this.mailDetails)
  }

  onClose() {
    this.displayChange.emit(false)
  }

}
