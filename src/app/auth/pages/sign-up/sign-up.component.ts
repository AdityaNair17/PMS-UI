import { AppService } from './../../../app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastMessageService } from './../../../shared/components/toast/service/toastMessage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { IPatientRegistrationReq } from '../../models/patientRegistration-model';
import { toastErrMessage, toastSuccMessage } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  patientSignupForm: FormGroup;
  public titleOptions : string[] = ['Mr', 'Mrs', 'Ms'];
  public roleOptions : string[] = ['Doctor', 'Patient', 'Nurse'];

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageSvc: ToastMessageService,
    private authService: AuthService,
    private router: Router,
    public activeModal : NgbActiveModal,
    private appSvc : AppService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.patientSignupForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      emailId: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      contactNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      role : [null, [Validators.required]]
    });
  }

  onRegister() {
    if (!this.patientSignupForm.valid) {
      return;
    }
    const patient = this.patientSignupForm.value as IPatientRegistrationReq;
    delete patient.confirmPassword;
    const reqObj = {
      title : patient.title,
      firstName : patient.firstName,
      lastName : patient.lastName,
      dob : this.appSvc.FormatDate(this.patientSignupForm.value.dateOfBirth),
      role : "Doctor",
      contactNumber : +patient.contactNumber,
      userCredentials : {
        email : patient.emailId,
        password : patient.password
      }
      
    }
    this.authService.patientRegistration(reqObj)
      .subscribe((data) => {
        if (data.status === 201) {
          toastSuccMessage.summary = "Registered Successfully!"
          this.toastMessageSvc.displayToastMessage(toastSuccMessage);
          this.router.navigate(['/auth/sign-in']);
          this.activeModal.close();
        }
        else {
          this.toastMessageSvc.displayToastMessage(toastErrMessage);
          this.activeModal.close();
        }

      });
      this.activeModal.close();

  }

}
