import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NoDataComponent } from './components/no-data/no-data.component';
import { ConfirmationAlertComponent } from './components/confirmation-alert/confirmation-alert.component';
import { AngularPrimeNgModule } from './modules/angular-prime-ng.module';
import { MaterialModule } from './modules/material-module';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [NoDataComponent, ConfirmationAlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularPrimeNgModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularPrimeNgModule,
    MaterialModule
  ],
  providers: [MessageService]
})
export class SharedModule { }
