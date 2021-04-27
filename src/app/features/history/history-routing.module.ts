import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryContainerComponent } from './history-container/history-container.component';
import { HistoryComponent } from './history.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },{
        path: 'list',
        component: HistoryContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
