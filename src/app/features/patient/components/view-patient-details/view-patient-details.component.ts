import { ActivatedRoute } from '@angular/router';
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
  @Input() patientId : string;
  readonlyMode: boolean;
  constructor(
    private toastMessageSvc: ToastMessageService,
    private ps: PatientService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.readonlyMode = this.editMode ? false : true;
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('id');
    })
    this.getPatients();
  }

  getPatients(user?: string) {
    this.ps.getPatient(this.patientId)
      .subscribe((patients) => {
        this.patient = patients;
        console.log(this.patient)
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage)
      });
  }
}
