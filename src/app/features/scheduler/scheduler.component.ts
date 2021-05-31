import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AuthService } from 'src/app/auth/auth.service';
import { SchedulerService } from './service/scheduler.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
              private authSvc: AuthService,
              private cdref : ChangeDetectorRef) { }

  ngOnInit(): void {

    this.currentDate = new Date();

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
      emailId : this.authSvc.User.id,
      startDate : this.schedulerSvc.FormatDate(this.startDate),
      endDate : this.schedulerSvc.FormatDate(this.endDate)
    }
    this.schedulerSvc.getListOfAppointments(requestBody).subscribe(appoinments => {
      if(Array.isArray(appoinments)){
        const appointmentsList = appoinments.filter(app => app.count > 0);
        this.allAppointments = this.resturctureAppointmentData(appointmentsList);
      } else {
        this.allAppointments = this.resturctureAppointmentData(appoinments);
      }
      this.cdref.detectChanges();
    });
  }


  resturctureAppointmentData(appointments) {

    const restrucredData: any[] = [];
    appointments.forEach(app => {
      const obj = {
        "title": `${app.count} Appointments`,
        "start": app.date
      };
      restrucredData.push(obj);
    });
    return restrucredData;
  }
  handleDateClick(event) {
    this.schedulerSvc.selectedDate = event.date;
    this.schedulerSvc.openAppointmentList(AppointmentListComponent);
  }

  handleEventClick(event) {
    this.schedulerSvc.selectedDate = event.event.start;
    this.schedulerSvc.openAppointmentList(AppointmentListComponent);
  }
  previousClick(event) {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.getListOfAppointment();
  }

  nextClick(event) {
    // this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    let numberOfDaysInNextMonth = new Date(year, month + 2, 0).getDate();
    if(this.currentDate.getDate() > numberOfDaysInNextMonth){
      this.currentDate = new Date(year, month + 1, numberOfDaysInNextMonth);
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }
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

    const modal = this.schedulerSvc.createEditAppointment(CreateAppointmentComponent, "add");
    modal.result.then((resp) => {
      this.getListOfAppointment();
    })
  }
}
