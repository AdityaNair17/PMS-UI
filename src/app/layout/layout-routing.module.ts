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
        path: 'change-password',
        component: ChangePasswordComponent
      }, {
        path: 'visit',
        loadChildren: () => import('../features/patient-visit/patient-visit.module').then(m => m.PatientVisitModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
