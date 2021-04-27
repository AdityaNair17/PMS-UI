import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientVisitRoutingModule } from './patient-visit-routing.module';
import { VisitMedicationComponent } from './visit-medication/visit-medication.component';
import { VisitDiagnosisComponent } from './visit-diagnosis/visit-diagnosis.component';
import { VisitProcedureComponent } from './visit-procedure/visit-procedure.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientVisitComponent } from './patient-visit.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';


@NgModule({
  declarations: [
    VisitMedicationComponent, 
    VisitDiagnosisComponent, 
    VisitProcedureComponent, 
    PatientVisitComponent, VisitDetailsComponent
  ],
  imports: [
    CommonModule,
    PatientVisitRoutingModule,
    SharedModule
  ]
})
export class PatientVisitModule { }
