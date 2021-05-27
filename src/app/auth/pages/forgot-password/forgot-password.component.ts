import { AuthService } from './../../auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal,
              private authSvc : AuthService) { }

  email : string;
  ngOnInit(): void {
  }

  forgotPassword(){
    this.authSvc.forgotPassword(this.email).subscribe(resp => {
      console.log(resp);
    })
  }
}
