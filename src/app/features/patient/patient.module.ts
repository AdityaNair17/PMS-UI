import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientDetailsComponent } from './components/add-patient-details/patient-details.component';
import { PatientEditDetailsComponent } from './components/patient-edit-details/patient-edit-details.component';
import { ViewPatientDetailsComponent } from './components/view-patient-details/view-patient-details.component';
import { PatientContainerComponent } from './components/patient-container/patient-container.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';


@NgModule({
  declarations: [PatientComponent, PatientDetailsComponent, PatientEditDetailsComponent, ViewPatientDetailsComponent, PatientContainerComponent, PatientListComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }
