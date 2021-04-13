import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IInbox, STATUS } from './models/inbox-models';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private httpClient: HttpClient) { }

  getAllInboxByuser(user: string): Observable<IInbox[]> {
    const inboxList: IInbox[] = [
      {
        id: 'qqahshjjk55612bdbfstjbsvfaayajbx',
        name: 'ankit',
        type: 'appointment/others',
        subject: 'upcoming appointment',
        status: STATUS.Upcoming,
        time: '20:15',
        date: '12 Apr'
      },
      {
        id: 'qqahshjjk55612bdbfstjbsvfaayajbx',
        name: 'ankit',
        type: 'appointment/others',
        subject: 'upcoming appointment',
        status: STATUS.Upcoming,
        time: '20:15',
        date: '12 Apr'
      },
      {
        id: 'qqahshjjk55612bdbfstjbsvfaayajbx',
        name: 'ankit',
        type: 'appointment/others',
        subject: 'upcoming appointment',
        status: STATUS.Upcoming,
        time: '20:15',
        date: '12 Apr'
      },
      {
        id: 'qqahshjjk55612bdbfstjbsvfaayajbx',
        name: 'ankit',
        type: 'appointment/others',
        subject: 'upcoming appointment',
        status: STATUS.Upcoming,
        time: '20:15',
        date: '12 Apr'
      },
      {
        id: 'qqahshjjk55612bdbfstjbsvfaayajbx',
        name: 'ankit',
        type: 'appointment/others',
        subject: 'upcoming appointment',
        status: STATUS.Upcoming,
        time: '20:15',
        date: '12 Apr'
      }
    ];
    return of(inboxList);
  }

}
