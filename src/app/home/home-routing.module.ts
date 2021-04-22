import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'inbox'
      },
      {
        path: 'inbox',
        loadChildren: () => import('../features/inbox/inbox.module').then(m => m.InboxModule)
      },
      {
        path: 'scheduler',
        loadChildren: () => import('../features/scheduler/scheduler.module').then(m => m.SchedulerModule)
      },
      {
        path: 'patient',
        loadChildren: ()=>import('../features/patient/patient.module').then(m=>m.PatientModule)

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
