import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AuthGuardGuard } from '../shared/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'visit',
        loadChildren: ()=>import('../features/patient-visit/patient-visit.module').then(m => m.PatientVisitModule) 
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'patient',
        loadChildren: ()=>import('../features/patient/patient.module').then(m=>m.PatientModule)

      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
