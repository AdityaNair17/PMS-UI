import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileMenuItems: MenuItem[];
  public user : string;
  customStyle = {
    backgroundColor :  '#00B2EE',
    cursor : 'pointer',
    color : '#FFFFFF'

  }
  constructor(private authSvc : AuthService) { }

  ngOnInit(): void {
    console.log(this.authSvc.User)
    this.user = `${this.authSvc.User.firstName} ${this.authSvc.User.lastName}`;
    this.profileMenuItems = [
      {label : this.user, styleClass : 'name'},
      {label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ''},
      {label: 'Change password', icon: 'pi pi-fw pi-pencil', routerLink: '/layout/change-password'},
      {label: 'Logout', icon : 'fa fa-sign-out' ,command : (event) => {this.LogOut()}, routerLink : ['/auth/sign-in']}
  ];
  }

  public LogOut(){
    this.authSvc.LogOut();

  }
}
