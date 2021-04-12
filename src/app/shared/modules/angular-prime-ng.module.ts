import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';

import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';



@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    ToastModule,
    MenuModule,
    MenubarModule
  ],
  exports: [
    ButtonModule,
    ToastModule,
    MenuModule,
    MenubarModule
  ]
})
export class AngularPrimeNgModule { }
