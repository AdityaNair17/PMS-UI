import { toastErrMessage } from 'src/app/shared/constants/constants';
import { ToastMessageService } from './../../../shared/components/toast/service/toastMessage.service';
import { pmsConstants, toastSuccMessage } from './../../../shared/constants/constants';
import { SchedulerService } from './../service/scheduler.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {

  public appointmentForm : FormGroup;
  public title : FormControl;
  public patientName : FormControl;
  public physcianName : FormControl;
  public dateOfAppointment : FormControl;
  public timeOfAppointment : FormControl;
  public description : FormControl;
  public disablePatient : boolean = false;
  public disableDoctor : boolean = false;
  public listOfDoctors : any[];
  public listOfPatients : any[];
  public availableTimeslots : any[];
  public todaysDate : Date;
  public CONSTANT = pmsConstants;

  constructor(public activeModal : NgbActiveModal,
              private authSvc : AuthService,
              private schedulerSvc : SchedulerService,
              private fb : FormBuilder,
              private toastMessageSvc : ToastMessageService) { }

  ngOnInit(): void {
    this.createControls();
    this.createFormGroup();

    this.schedulerSvc.getTimeSlots().subscribe(slots => {
      this.availableTimeslots = this.formatTimeSlot(slots);
    })

    const role = this.authSvc.UserRole;
    const loggedInUser = this.authSvc.User;
    if(role == 'Patient'){
      this.listOfPatients = [];
      this.listOfPatients.push({
        userId : loggedInUser.id,
        name : `${loggedInUser.firstName} ${loggedInUser.lastName}`
      });
      this.appointmentForm.get("patientName").patchValue(this.listOfPatients[0]);
      this.disablePatient = true;
    } else  if(role == 'Doctor'){
      this.listOfDoctors = [];
      this.listOfDoctors.push({
        userId : loggedInUser.id,
        name : `${loggedInUser.firstName} ${loggedInUser.lastName}`
      });
      this.appointmentForm.get("physcianName").patchValue(this.listOfDoctors[0]);
      this.disableDoctor = true;
    }

    if(!this.disableDoctor){
      this.schedulerSvc.getListOfDoctors().subscribe( doctors => {
        this.listOfDoctors = this.formatData(doctors);
      });


    }

    if(!this.disablePatient){
      this.schedulerSvc.getListOfPatients().subscribe( patients => {
        this.listOfPatients = this.formatData(patients);
        
      });
    }


    this.todaysDate = new Date();
  }

  createControls(){
    this.title = new FormControl('', Validators.required);
    this.patientName = new FormControl('', Validators.required);
    this.physcianName = new FormControl('', Validators.required);
    this.dateOfAppointment = new FormControl('', Validators.required);
    this.timeOfAppointment = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
  }

  createFormGroup(){
    this.appointmentForm = this.fb.group({
      title : this.title,
      patientName : this.patientName,
      physcianName : this.physcianName,
      dateOfAppointment : this.dateOfAppointment,
      timeOfAppointment : this.timeOfAppointment,
      description : this.description
    })
  }

  formatData(details){

    const formattedDetails = [];
    details.forEach(data => {
      const obj = {
        userId : data.userId,
        name : `${data.firstName} ${data.lastName}`
      }
      formattedDetails.push(obj);
    });
    return formattedDetails;
  }

  createAppointment(){
    const time = this.timeOfAppointment.value;
    const endTime = time.minutes == 30 ? `${time.hours+1}:00` : `${time.hours}:30`
    const reqObj = {
      physcianId : this.physcianName.value.userId,
      patientId : this.patientName.value.userId,
      date : this.schedulerSvc.FormatDate(this.dateOfAppointment.value),
      status : "BOOKED",
      startTime : this.timeOfAppointment.value.fullTime,
      endTime : endTime,
      description : this.description.value
    }
    this.schedulerSvc.createAppointment(reqObj).subscribe(response => {
      if(response.status == 200){
        this.toastMessageSvc.displayToastMessage(toastSuccMessage);
      } else {
        this.toastMessageSvc.displayToastMessage(toastErrMessage);
      }
      this.activeModal.close();

    })
  }

  formatTimeSlot(slots){
    const formattedSlots = [];
    slots.forEach(slot => {
      const obj = {
        hours : slot.hours,
        minutes : slot.minutes,
        fullTime : slot.minutes == 30 ? `${slot.hours}:${slot.minutes}` : `${slot.hours}:00`
      };
      formattedSlots.push(obj);
    });
    return formattedSlots;
  }

  isControlInvalid(control : FormControl){
    // console.log(control);
    return control.invalid && (control.dirty || control.touched);
  }
}
