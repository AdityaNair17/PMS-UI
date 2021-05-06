import { VisitVitalsComponent } from './visit-vitals/visit-vitals.component';
import { VisitDiagnosisComponent } from './visit-diagnosis/visit-diagnosis.component';
import { VisitProcedureComponent } from './visit-procedure/visit-procedure.component';
import { VisitMedicationComponent } from './visit-medication/visit-medication.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientVisitComponent } from './patient-visit.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';

const routes: Routes = [
  {
    path: '',
    component: PatientVisitComponent,
    children: [
      {
        path: ':id/:readOnly',
        component: VisitDetailsComponent
      }
      // {
      //   path : 'medication',
      //   component : VisitMedicationComponent
      // },
      // {
      //   path: 'procedure',
      //   component : VisitProcedureComponent
      // }, 
      // {
      //   path: 'diagnosis',
      //   component : VisitDiagnosisComponent 
      // },
      // {
      //   path : 'vitals',
      //   component : VisitVitalsComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientVisitRoutingModule { }
