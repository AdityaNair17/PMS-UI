import { AuthService } from 'src/app/auth/auth.service';
import { SchedulerService } from './service/scheduler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendar } from 'primeng/fullcalendar';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  public events : any[];
  public options : any;
  private currentMonth : String;
  private currentYear : String;
  @ViewChild('calendar') private calendar: FullCalendar;
  constructor(private schedulerSvc : SchedulerService, private authSvc : AuthService) { }

  ngOnInit(): void {
    
    this.schedulerSvc.randomCall().subscribe((data) => {
      console.log(data);
    });
    this.schedulerSvc.getEvents().then(events => {this.events = events;});

    this.options = {
      plugins:[  dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2017-02-10',
      header: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true
  };
  }

}
