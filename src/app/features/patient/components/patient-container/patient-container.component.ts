import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast/service/toastMessage.service';
import { toastErrMessage } from 'src/app/shared/constants/constants';
import { IPatient } from '../../models/patientDetails-model';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-patient-container',
  templateUrl: './patient-container.component.html',
  styleUrls: ['./patient-container.component.scss']
})
export class PatientContainerComponent implements OnInit {
  patients: IPatient[] = [];
  constructor(
    private toastMessageSvc: ToastMessageService,
    private ps: PatientService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getPatients(this.authService.UserRole === 'Patient' ? this.authService.User.emailId : null);
  }

  getPatients(user?: string) {
    this.ps.getAllPatients()
      .subscribe((patients) => {
        this.patients = patients;
        console.log(patients)
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage)
      });
  }



}
