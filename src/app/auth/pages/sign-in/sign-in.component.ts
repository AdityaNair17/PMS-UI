import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public loginDetails : any = {
    "userName" : "",
    "password" : ""
  }
  constructor(private authSvc : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authSvc.Login(this.loginDetails).subscribe(
      data => {
        this.authSvc.AuthenticationToken = data.token;
        this.authSvc.UserRole = data.user.role;
        this.authSvc.ChangePasswordRequired = data.changePasswordRequired;
        this.authSvc.PersonalDetailsRequired = data.personalDetailsRequired;
        let user = {
          firstName : data.user.firstName,
          lastName : data.user.lastName,
          emailId : data.user.emailId,
          dateOfBirth : data.user.dateOfBirth
        }
        this.authSvc.User = user;
        if(data.changePasswordRequired){
          this.router.navigate(['\reset-password']);
        } else if(data.personalDetailsRequired){
          //re direct to patient details page
          // this.router.navigate(['\'])
        } else {
          // redirect to inbox
        }
      }
    );
  }
}
