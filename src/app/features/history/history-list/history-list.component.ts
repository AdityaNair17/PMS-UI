import { Component, Input, OnInit } from '@angular/core';
import { IHistoryList } from '../models/history-model';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
@Input() historyList: IHistoryList[];
  constructor() { }

  ngOnInit(): void {
  }

}
