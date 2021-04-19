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

  public events: any[];
  public allAppointments: any[];
  public currentDate: Date;
  public options: any;
  private startDate : Date;
  private endDate : Date;
  @ViewChild('calendar') private calendar: FullCalendar;
  constructor(private schedulerSvc: SchedulerService,
              private authSvc: AuthService) { }

  ngOnInit(): void {

    this.currentDate = new Date();

    this.getListOfAppointment();

  }


  getListOfAppointment() {
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();


    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    this.startDate = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay()));
    this.endDate = new Date(lastDayOfMonth.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay())));

    const requestBody = {
      emailId : this.authSvc.User.emailId,
      startDate : this.FormatDate(this.startDate),
      endDate : this.FormatDate(this.endDate)
    }
    this.schedulerSvc.getListOfAppointments(requestBody).subscribe(appoinments => {
      const appointmentsList = appoinments.filter(app => app.noOfAppointments > 0);
      this.allAppointments = this.resturctureAppointmentData(appointmentsList);

      const defaultDate = this.FormatDate(this.currentDate);
      this.options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: defaultDate,
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true,
        dateClick: this.handleDateClick.bind(this),
        eventClick: this.handleDateClick.bind(this),
      };
    });
  }


  resturctureAppointmentData(appointments) {

    const restrucredData: any[] = [];
    appointments.forEach(app => {
      const obj = {
        "title": `${app.noOfAppointments} Appointments`,
        "start": app.date
      };
      restrucredData.push(obj);
    });
    return restrucredData;
  }
  handleDateClick(event) {
    // console.log(event.event.start);
    // event.stopPropogation();
    this.schedulerSvc.openAppointmentList(AppointmentListComponent);
  }

  previousClick(event) {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    console.log(this.currentDate);
    this.getListOfAppointment();
  }

  nextClick(event) {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    console.log(this.currentDate);
    this.getListOfAppointment();

  }

  ngAfterViewInit() {
    this.bindEvents();
  }

  bindEvents() {
    let prevButton = this.calendar.el.nativeElement.getElementsByClassName("fc-prev-button");
    prevButton[0].addEventListener('click', this.previousClick.bind(this));

    let nextButton = this.calendar.el.nativeElement.getElementsByClassName("fc-next-button");
    nextButton[0].addEventListener('click', this.nextClick.bind(this));
  }


  FormatDate(fullDate: Date) {
    let date: any = fullDate.getDate();
    date = date >= 10 ? date : `0${date}`;

    let month: any = fullDate.getMonth() + 1;
    month = month >= 10 ? month : `0${month}`;

    const year = fullDate.getFullYear();

    return `${year}-${month}-${date}`;

  }
}
