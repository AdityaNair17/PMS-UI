import { Component, Input, OnInit } from '@angular/core';
import { IPatient } from '../../models/patientDetails-model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
@Input() patients: IPatient[];
  constructor() { }

  ngOnInit(): void {
    console.log(this.patients)
  }

}
