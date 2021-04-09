import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';




@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    ToastModule
  ],
  exports: [
    ButtonModule,
    ToastModule
  ]
})
export class AngularPrimeNgModule { }
