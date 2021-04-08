import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dasboard',
        pathMatch: 'full'
      },
      {
        path: 'dasboard',
        loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'mail-inbox',
        loadChildren: ()=>import('../features/inbox/inbox.module').then(m =>m.InboxModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
