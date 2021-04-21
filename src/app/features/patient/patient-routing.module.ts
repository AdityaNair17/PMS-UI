import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPatientDetailsComponent } from './components/view-patient-details/view-patient-details.component';
import { PatientDetailsComponent } from './components/add-patient-details/patient-details.component';
import { PatientEditDetailsComponent } from './components/patient-edit-details/patient-edit-details.component';
import { PatientComponent } from './patient.component';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [
      {
        path: '',
        redirectTo: 'add-patient-details',
        pathMatch: 'full'
      },
      {
        path: 'add-patient-details',
        component: PatientDetailsComponent
      },
      {
        path: 'edit-patient-details/:id',
        component: PatientEditDetailsComponent
      },
      {
        path: 'view-patient-details/:id',
        component: ViewPatientDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
