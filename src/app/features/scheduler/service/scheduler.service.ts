import { AppService } from './../../../app.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

constructor(private http: HttpClient, private appSvc : AppService) { }

getEvents() {
  return this.http.get<any>('assets/json/calendarEvents.json')
    .toPromise()
    .then(res => <any[]>res.data)
    .then(data => { return data; });
  }

  randomCall(){
    console.log("called");
    return this.appSvc.Get('http://localhost:3000/data');

  }
}
