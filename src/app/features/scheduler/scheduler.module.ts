import { SchedulerService } from './service/scheduler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { FullCalendarModule } from 'primeng/fullcalendar'

@NgModule({
  declarations: [SchedulerComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    FullCalendarModule
  ],
  providers: [SchedulerService]
})
export class SchedulerModule { }
