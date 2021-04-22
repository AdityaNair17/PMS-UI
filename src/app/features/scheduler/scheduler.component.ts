import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
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
      startDate : this.schedulerSvc.FormatDate(this.startDate),
      endDate : this.schedulerSvc.FormatDate(this.endDate)
    }
    this.schedulerSvc.getListOfAppointments(requestBody).subscribe(appoinments => {
      const appointmentsList = appoinments.filter(app => app.noOfAppointments > 0);
      this.allAppointments = this.resturctureAppointmentData(appointmentsList);

      const defaultDate = this.schedulerSvc.FormatDate(this.currentDate);
      this.options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: defaultDate,
        fixedWeekCount: false,
        header: {
          left: 'prev,next',
          center: 'title',
          // right: 'addAppointment,dayGridMonth,timeGridWeek,timeGridDay',
          right: 'addAppointment'
        },
        editable: true,
        dateClick: this.handleDateClick.bind(this),
        eventClick: this.handleEventClick.bind(this),
        customButtons : {
          addAppointment : {
            text : "Add Appointment",
            click : this.addAppointment.bind(this)
          }
        }
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
    console.log(event);
    this.schedulerSvc.selectedDate = event.date;
    this.schedulerSvc.openAppointmentList(AppointmentListComponent);
  }

  handleEventClick(event) {
    console.log(event);
    this.schedulerSvc.selectedDate = event.event.start;
    console.log(this.schedulerSvc.selectedDate);
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

  addAppointment(event){

    this.schedulerSvc.createEditAppointment(CreateAppointmentComponent, "add");
  }
}
