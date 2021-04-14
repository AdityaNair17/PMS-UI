import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IInbox, STATUS } from './models/inbox-models';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  inboxList: IInbox[] = [
    {
      id: 'qqahshjjk55612bdbfstjbsvfaayajbx0',
      name: 'Ankit sawant',
      type: 'appointment/others',
      subject: 'upcoming appointment',
      status: STATUS.Upcoming,
      time: '20:15',
      date: '13 Apr'
    },
    {
      id: 'qqahshjjk55612bdbfstjbsvfaayajbx1',
      name: 'Onkar Patil',
      type: 'appointment/others',
      subject: 'upcoming appointment',
      status: STATUS.Upcoming,
      time: '20:17',
      date: '14 Apr'
    },
    {
      id: 'qqahshjjk55612bdbfstjbsvfaayajbx2',
      name: 'Dr. Sanket Chaudhari',
      type: 'appointment/others',
      subject: 'upcoming appointment',
      status: STATUS.Upcoming,
      time: '20:18',
      date: '15 Apr'
    },
    {
      id: 'qqahshjjk55612bdbfstjbsvfaayajbx3',
      name: 'Kamlesh Badgujar',
      type: 'appointment/others',
      subject: 'Appointment Request For 13/03/2021 21:00',
      status: STATUS.Upcoming,
      time: '20:25',
      date: '21 Apr'
    },
    {
      id: 'qqahshjjk55612bdbfstjbsvfaayajbx4',
      name: 'Pranav Ekapure',
      type: 'appointment/others',
      subject: 'Reports of Patient XYZ',
      status: STATUS.Upcoming,
      time: '20:30',
      date: '20 Apr'
    }
  ];

  constructor(private httpClient: HttpClient) { }

  getAllInboxByuser(user: string): Observable<IInbox[]> {
    return of(this.inboxList);
  }

  getMailById(id: string): Observable<IInbox> {
    const mailDetails = this.inboxList.find(mail => mail.id === id);
    return of(mailDetails);
  }

}
