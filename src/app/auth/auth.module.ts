import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AuthComponent, 
    SignInComponent, 
    SignUpComponent, 
    ForgotPasswordComponent,
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers : [AuthService]
})
export class AuthModule { }
