import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.params['email'];
    console.log(this.email);
  }

}
