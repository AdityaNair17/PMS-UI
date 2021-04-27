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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientVisitRoutingModule { }
