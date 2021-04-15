import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
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
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
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
    delete this.changePasswordForm.value['newPassword'];
    const changePasswordDetails = this.changePasswordForm.value as IChangePasswordReq;
    Object.assign(changePasswordDetails, {emailId: null})
    this.authService.changePassword(changePasswordDetails)
      .subscribe((data) => {
        if(data.status === 200){
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Password changed successfully!'});
          this.router.navigate(['/layout/home']);
        }
        else
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong!' });
      });
  }

  

}
