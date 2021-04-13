import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NoDataComponent } from './components/no-data/no-data.component';
import { ConfirmationAlertComponent } from './components/confirmation-alert/confirmation-alert.component';
import { AngularPrimeNgModule } from './modules/angular-prime-ng.module';
import { MaterialModule } from './modules/material-module';
import { AvatarModule } from 'ngx-avatar';
import { ToastComponent } from './components/toast/toast.component';



@NgModule({
  declarations: [NoDataComponent, ConfirmationAlertComponent, ToastComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularPrimeNgModule,
    MaterialModule,
    AvatarModule,
    ToastModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularPrimeNgModule,
    MaterialModule,
    AvatarModule,
    ToastComponent
  ],
  providers: []
})
export class SharedModule { }
