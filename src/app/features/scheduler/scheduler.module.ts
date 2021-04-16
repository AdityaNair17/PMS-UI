import { FormsModule } from '@angular/forms';
import { AngularPrimeNgModule } from './../../shared/modules/angular-prime-ng.module';
import { SchedulerService } from './service/scheduler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { AppointmentListComponent } from './appointment-list/appointment-list.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SchedulerComponent, AppointmentListComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    FullCalendarModule,
    NgbModule,
    AngularPrimeNgModule,
    FormsModule
  ],
  providers: [SchedulerService],
  entryComponents : [AppointmentListComponent]
})
export class SchedulerModule { }
