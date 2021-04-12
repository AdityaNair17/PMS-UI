import { pmsConstants } from './../../../shared/constants/constants';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authSvc.Login(this.loginDetails).subscribe(
      data => {
        console.log(data);
          this.invalidMessageFlag = false;
          this.authSvc.AuthenticationToken = data.token;
          this.authSvc.UserRole = data.user.role;
          this.authSvc.PasswordChangeRequired = data.user.passwordChangeRequired;
          this.authSvc.PersonalDetailsRequired = data.user.personalDetailsRequired;
          let user = {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            emailId: data.user.emailId,
            dateOfBirth: data.user.dateOfBirth
          }
          this.authSvc.User = user;
          if (data.user.passwordChangeRequired) {
            this.router.navigate(['auth/reset-password']);
          } else if (data.user.personalDetailsRequired) {
            //re direct to patient details page
            // this.router.navigate(['\'])
          } else {
            // redirect to inbox
          }
        } , (error) => {
          this.invalidMessageFlag = true;
          console.log(error);
        }
    );
  }
}
