import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileMenuItems: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.profileMenuItems = [
      {label: 'Manage account', icon: 'pi pi-fw pi-users', routerLink:''},
      {label: 'My profile', icon: 'pi pi-fw pi-user', routerLink: ''},
      {label: 'Change password', icon: 'pi pi-fw pi-pencil', routerLink: '/layout/change-password'}
  ];
  }

}
