import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';

import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';

import {ListboxModule} from 'primeng/listbox';
import {TableModule} from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    ListboxModule,
    TableModule,
    InputTextModule
  ],
  exports: [
    ButtonModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    ListboxModule,
    TableModule,
    InputTextModule
  ]
})
export class AngularPrimeNgModule { }
