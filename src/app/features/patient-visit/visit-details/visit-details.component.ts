import { VisitService } from './../service/visit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss']
})
export class VisitDetailsComponent implements OnInit {

  public patientName : string;
  public physcianName : string;
  public appointmentDate : string;
  constructor(private visitSvc : VisitService) { }

  ngOnInit(): void {
    this.patientName = this.visitSvc.AppointmentDetails.patientName;
    this.physcianName = this.visitSvc.AppointmentDetails.physcianName;
    this.appointmentDate = this.visitSvc.AppointmentDetails.appointmentDate;
  }

}
