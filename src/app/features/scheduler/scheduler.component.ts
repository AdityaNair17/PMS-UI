import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AuthService } from 'src/app/auth/auth.service';
import { SchedulerService } from './service/scheduler.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendar } from 'primeng/fullcalendar';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit, AfterViewInit {

  public events : any[];
  public allAppointments : any[];
  public currentDate : Date;
  public options : any;
  private currentMonth : String;
  private currentYear : String;
  @ViewChild('calendar') private calendar: FullCalendar;
  constructor(private schedulerSvc : SchedulerService, private authSvc : AuthService) { }

  ngOnInit(): void {
    
    this.currentDate = new Date();
    
    this.getListOfAppointment();

  }


  getListOfAppointment() {
    this.schedulerSvc.getListOfAppointments().subscribe(appoinments => {
        const appointmentsList = appoinments.filter(app => app.noOfAppointments > 0);
        this.allAppointments = this.resturctureAppointmentData(appointmentsList);

        let date : any = this.currentDate.getDate();
        date = date >= 10 ? date : `0${date}`;

        let month : any = this.currentDate.getMonth() + 1;
        month = month >= 10 ? month : `0${month}`;

        const year = this.currentDate.getFullYear();
        this.options = {
          plugins:[  dayGridPlugin, timeGridPlugin, interactionPlugin],
          defaultDate: `${year}-${month}-${date}`,
          header: {
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          editable: true,
          dateClick: this.handleDateClick.bind(this),
          eventClick: this.handleDateClick.bind(this),
          prevClick: this.handleDateClick.bind(this)
      };
    });
  }


  resturctureAppointmentData(appointments){
    
    const restrucredData : any[] = [];
    appointments.forEach(app => {
      const obj = {
        "title" : `${app.noOfAppointments} Appointments`,
        "start" : app.date
      };
      restrucredData.push(obj);
    });
    return restrucredData;
  }
  handleDateClick(event){
    // console.log(event.event.start);
    console.log(event)
    console.log(typeof(Event));
    // event.stopPropogation();
    this.schedulerSvc.openAppointmentList(AppointmentListComponent);
  }

  ngAfterViewInit(){
    this.bindEvents();
    console.log("Start " + this.calendar.calendar.component.props.dateProfile.activeRange.start);
  }

  bindEvents(){
    let prevButton = this.calendar.el.nativeElement.getElementsByClassName("fc-prev-button");
    prevButton[0].addEventListener('click', (event) => {
      console.log(event);
    })
  }
}
