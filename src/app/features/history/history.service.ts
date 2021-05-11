import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IHistoryList } from './models/history-model';
import * as history from '../../../assets/json/visitHistory.json';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }

  getAllHistory(userId?: string): Observable<IHistoryList[]> {

    return of((history as any).default);
  }
}
