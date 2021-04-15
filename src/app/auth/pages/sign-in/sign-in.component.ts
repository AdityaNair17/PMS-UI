import { ToastMessageService } from './../../../shared/components/toast/service/toastMessage.service';
import { pmsConstants } from './../../../shared/constants/constants';
import { AuthService } from './../../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})


export class SignInComponent implements OnInit {

  public loginDetails: any = {
    "email": "",
    "password": ""
  }
  public invalidMessageFlag: boolean = false;
  public CONSTANT = pmsConstants;
  @ViewChild('loginForm') loginForm : FormGroup;

  constructor(private authSvc: AuthService, private router: Router,
              private toastMessageSvc : ToastMessageService) { }

  ngOnInit(): void {
  }


  login(){
    if(!this.loginForm.valid){
      if(this.loginForm.controls['username'].invalid){
        this.loginForm.controls['username'].markAsTouched();
      }
      if(this.loginForm.controls['password'].invalid){
        this.loginForm.controls['password'].markAsTouched();
      }     
    } else {
      this.verifyLogin();
    }
  }


  verifyLogin() {
    this.authSvc.Login(this.loginDetails).subscribe(
      data => {
        console.log(data);
          this.invalidMessageFlag = false;
          this.authSvc.AuthenticationToken = data.token;
          this.authSvc.UserRole = data.user.role;
          // this.authSvc.PasswordChangeRequired = data.user.passwordChangeRequired;
          // this.authSvc.PersonalDetailsRequired = data.user.personalDetailsRequired;
          this.authSvc.PasswordChangeRequired = false;
          this.authSvc.PersonalDetailsRequired =false;
          this.authSvc.IsUserAuthenticated = true;
          let user = {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            emailId: data.user.emailId,
            dateOfBirth: data.user.dateOfBirth
          }
          this.authSvc.User = user;
          this.authSvc.StoreSession();
          const toastMessage = {
            severity : "success",
            summary : "Logged in Successfully"
          }
          this.toastMessageSvc.displayToastMessage(toastMessage);
          if ( this.authSvc.PasswordChangeRequired) {
            this.router.navigate(['/layout/change-password']);
          } else if ( this.authSvc.PersonalDetailsRequired) {
            //re direct to patient details page
            // this.router.navigate(['\'])
          } else {
            this.router.navigate(['/layout/home'])
          }
        } , (error) => {
          this.invalidMessageFlag = true;
          const toastMessage = {
            severity : "error",
            summary : "Invalid Username or Password",
            life : 2000
          }
          this.toastMessageSvc.displayToastMessage(toastMessage);
          console.log(error);
        }
    );
  }

  isControlInvalid(control : FormControl){
    // console.log(control);
    return control.invalid && (control.dirty || control.touched);
  }
}
