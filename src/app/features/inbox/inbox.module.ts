import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { InboxFilterComponent } from './components/inbox-filter/inbox-filter.component';
import { InboxListComponent } from './components/inbox-list/inbox-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InboxContainerComponent } from './components/inbox-container/inbox-container.component';


@NgModule({
  declarations: [
    InboxComponent, 
    InboxFilterComponent, 
    InboxListComponent, InboxContainerComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    SharedModule
  ]
})
export class InboxModule { }
