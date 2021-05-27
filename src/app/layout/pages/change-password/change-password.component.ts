import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast/service/toastMessage.service';
import { toastErrMessage, toastSuccMessage } from 'src/app/shared/constants/constants';
import { IChangePasswordReq } from '../../models/changePassword-model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastMessageSvc: ToastMessageService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]]
    });
  }

  changePassword(){
    if(!this.changePasswordForm.valid){
      return;
    }
    delete this.changePasswordForm.value['confirmNewPassword'];
    const changePasswordDetails = this.changePasswordForm.value as IChangePasswordReq;
    Object.assign(changePasswordDetails, {email: this.authService.User.emailId});
    this.authService.changePassword(changePasswordDetails)
      .subscribe((data) => {
        console.log(data);
        this.authService.PasswordChangeRequired = false;
        this.authService.StoreSession();
        if(this.authService.PersonalDetailsRequired){
          this.router.navigate(['/layout/patient/add-patient-details']);
        } else {
          this.router.navigate(['/layout/home']);
        }
        this.authService.upatedPatientDetailsRequirement(false, this.authService.PersonalDetailsRequired,  this.authService.User.id).subscribe(resp => {
          console.log(resp);
        });
        // if(data.status === 200){
        //   toastSuccMessage.summary = 'Password changed successfully!'
        //   this.router.navigate(['/layout/home']);
        //   this.toastMessageSvc.displayToastMessage(toastSuccMessage)
        // }
        // else
        // this.toastMessageSvc.displayToastMessage(toastErrMessage)
      });

              if(this.authService.PersonalDetailsRequired){
          this.router.navigate(['/layout/patient/add-patient-details']);
        } else {
          this.router.navigate(['/layout/home']);
        }
  }

  

}
