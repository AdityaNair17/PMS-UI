import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularPrimeNgModule } from './../../shared/modules/angular-prime-ng.module';
import { SchedulerService } from './service/scheduler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { AppointmentListComponent } from './appointment-list/appointment-list.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';

@NgModule({
  declarations: [SchedulerComponent, AppointmentListComponent, CreateAppointmentComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    FullCalendarModule,
    NgbModule,
    AngularPrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SchedulerService],
  entryComponents : [AppointmentListComponent]
})
export class SchedulerModule { }
