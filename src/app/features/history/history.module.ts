import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryContainerComponent } from './history-container/history-container.component';
import { HistoryListComponent } from './history-list/history-list.component';


@NgModule({
  declarations: [HistoryComponent, HistoryContainerComponent, HistoryListComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule
  ]
})
export class HistoryModule { }
