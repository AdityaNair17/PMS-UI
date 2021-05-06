import { AngularPrimeNgModule } from './../../shared/modules/angular-prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';


import { PatientVisitRoutingModule } from './patient-visit-routing.module';
import { VisitMedicationComponent } from './visit-medication/visit-medication.component';
import { VisitDiagnosisComponent } from './visit-diagnosis/visit-diagnosis.component';
import { VisitProcedureComponent } from './visit-procedure/visit-procedure.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientVisitComponent } from './patient-visit.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { VisitVitalsComponent } from './visit-vitals/visit-vitals.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};


@NgModule({
  declarations: [
    VisitMedicationComponent, 
    VisitDiagnosisComponent, 
    VisitProcedureComponent, 
    PatientVisitComponent, VisitDetailsComponent, VisitVitalsComponent
  ],
  imports: [
    CommonModule,
    PatientVisitRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularPrimeNgModule,
    NgWizardModule.forRoot(ngWizardConfig)
  ]
})
export class PatientVisitModule { }
