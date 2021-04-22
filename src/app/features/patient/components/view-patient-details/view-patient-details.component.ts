import { Component, Input, OnInit } from '@angular/core';
import { ToastMessageService } from 'src/app/shared/components/toast/service/toastMessage.service';
import { toastErrMessage } from 'src/app/shared/constants/constants';
import { IPatient } from '../../models/patientDetails-model';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-view-patient-details',
  templateUrl: './view-patient-details.component.html',
  styleUrls: ['./view-patient-details.component.scss']
})
export class ViewPatientDetailsComponent implements OnInit {
  patient: IPatient;
  @Input() editMode: boolean;
  readonlyMode: boolean;
  constructor(
    private toastMessageSvc: ToastMessageService,
    private ps: PatientService,
  ) { }

  ngOnInit(): void {
    this.readonlyMode = this.editMode ? false : true;
    this.getPatients();
  }

  getPatients(user?: string) {
    this.ps.getPatient()
      .subscribe((patients) => {
        this.patient = patients;
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage)
      });
  }
}
