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

  constructor(private authSvc : AuthService) { }

  ngOnInit(): void {
    this.profileMenuItems = [
      {label: 'Manage account', icon: 'pi pi-fw pi-users', routerLink:''},
      {label: 'My profile', icon: 'pi pi-fw pi-user', routerLink: ''},
      {label: 'Change password', icon: 'pi pi-fw pi-pencil', routerLink: '/layout/change-password'},
      {label: 'Logout', command : (event) => {this.LogOut()}, routerLink : ['/auth/sign-in']}
  ];
  }

  public LogOut(){
    this.authSvc.LogOut();

  }
}
