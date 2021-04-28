import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IHistoryList } from './models/history-model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }

  getAllHistory(userId?: string): Observable<IHistoryList[]> {
    const data: IHistoryList[] = [
      { name: 'Ankit Sawant', appointmentDate: '12/03/2021', diagnosis: ['abc'], procedure: ['xyz'], nextAppointmentDate: '29/03/2021', id: '44dddddssssggdsss' },
      { name: 'Onkar Patil', appointmentDate: '12/03/2021', diagnosis: ['abc'], procedure: ['xyz'], nextAppointmentDate: '29/03/2021', id: '44dddddssssggdsss' },
      { name: 'Pranav Ekapure', appointmentDate: '12/03/2021', diagnosis: ['abc'], procedure: ['xyz'], nextAppointmentDate: '29/03/2021', id: '44dddddssssggdsss' },
      { name: 'Lalit Sinnarkar', appointmentDate: '12/03/2021', diagnosis: ['abc'], procedure: ['xyz'], nextAppointmentDate: '29/03/2021', id: '44dddddssssggdsss' },
      { name: 'Sarvesh Tularpurkar', appointmentDate: '12/03/2021', diagnosis: ['abc'], procedure: ['xyz'], nextAppointmentDate: '29/03/2021', id: '44dddddssssggdsss' },
      { name: 'Ankit Sawant', appointmentDate: '12/03/2021', diagnosis: ['abc'], procedure: ['xyz'], nextAppointmentDate: '29/03/2021', id: '44dddddssssggdsss' },
      { name: 'Ankit Sawant', appointmentDate: '12/03/2021', diagnosis: ['abc'], procedure: ['xyz'], nextAppointmentDate: '29/03/2021', id: '44dddddssssggdsss' },
    ];
    return of(data);
  }
}
