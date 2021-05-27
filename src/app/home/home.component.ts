import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public role : string = "Doctor";
  constructor(private svc : AuthService) { }

  ngOnInit(): void {
    this.role = this.svc.UserRole;
  }

}
