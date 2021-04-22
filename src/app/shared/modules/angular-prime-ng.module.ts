import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {ListboxModule} from 'primeng/listbox';
import {TableModule} from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';

import { CalendarModule } from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    ListboxModule,
    TableModule,
    InputTextModule,
    DialogModule,
    TooltipModule,
    CalendarModule,
    AccordionModule,
    DropdownModule
  ],
  exports: [
    ButtonModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    ListboxModule,
    TableModule,
    InputTextModule,
    DialogModule,
    TooltipModule,
    CalendarModule,
    AccordionModule,
    DropdownModule
  ]
})
export class AngularPrimeNgModule { }
