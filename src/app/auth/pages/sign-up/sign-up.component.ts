import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth.service';
import { IPatientRegistrationReq } from '../../models/patientRegistration-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService]
})
export class SignUpComponent implements OnInit {
  patientSignupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
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
      confirmPassword: [null, [Validators.required]]
    });
  }

  onRegister() {
    if(!this.patientSignupForm.valid){
      return;
    }
    const patient = this.patientSignupForm.value as IPatientRegistrationReq;
    delete patient.confirmPassword;
    this.authService.patientRegistration(patient)
      .subscribe((data) => {
        if(data.status === 200){
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Registered successfully!'});
          this.router.navigate(['/auth/sign-in']);
        }
        else
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong!' });
      });

  }

}
