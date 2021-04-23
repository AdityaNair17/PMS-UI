import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast/service/toastMessage.service';
import { accessList, genderList, toastErrMessage, toastSuccMessage } from 'src/app/shared/constants/constants';
import { IAllergies, ILanguageKnown, IPatient } from '../../models/patientDetails-model';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  @Input() readonlyMode: boolean;
  @Input() patient: IPatient;
  genderList: string[] = genderList;
  accessList: any[] = accessList;
  languages: ILanguageKnown[] = [];
  allergies: IAllergies[] = [];
  addPatientDetailsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageSvc: ToastMessageService,
    private router: Router,
    private ps: PatientService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getLanguageKnownList();
    this.getAllergies();
  }

  buildForm() {
    this.addPatientDetailsForm = this.formBuilder.group({
      basicDetails: this.formBuilder.group({
        firstName: [this.patient.basicDetails ? this.patient.basicDetails.firstName : null, [Validators.required,]],
        lastName: [this.patient.basicDetails ? this.patient.basicDetails.lastName : null, [Validators.required,]],
        emailId: [this.patient.basicDetails ? this.patient.basicDetails.emailId : null, [Validators.required,]],
        dateOfBirth: [this.patient.basicDetails ? new Date(this.patient.basicDetails.dateOfBirth) : null, [Validators.required,]],
        contactNo: [this.patient.basicDetails ? this.patient.basicDetails.contactNo : null, [Validators.required,]],
        age: [this.patient.basicDetails ? this.patient.basicDetails.age : null, [Validators.required,]],
        gender: [this.patient.basicDetails ? this.patient.basicDetails.gender : null, [Validators.required,]],
        race: [this.patient.basicDetails ? this.patient.basicDetails.race : null],
        ethnicity: [this.patient.basicDetails ? this.patient.basicDetails.ethnicity : null],
      }),
      address: this.formBuilder.group({
        landmarkArea: [this.patient.address ? this.patient.address.landmarkArea : null, [Validators.required,]],
        city: [this.patient.address ? this.patient.address.city : null, [Validators.required,]],
        state: [this.patient.address ? this.patient.address.state : null, [Validators.required,]],
        country: [this.patient.address ? this.patient.address.country : null, [Validators.required,]],
        pin: [this.patient.address ? this.patient.address.pin : null, [Validators.required,]],
        addressType: [this.patient.address ? this.patient.address.addressType : null, [Validators.required]]
      }),
      emergency_Details: this.formBuilder.group({
        emergency_first_name: [this.patient.emergencyDetails ? this.patient.emergencyDetails.emergency_first_name : null, [Validators.required,]],
        emergency_last_name: [this.patient.emergencyDetails ? this.patient.emergencyDetails.emergency_last_name : null, [Validators.required,]],
        emergency_relation_ship: [this.patient.emergencyDetails ? this.patient.emergencyDetails.emergency_relation_ship : null, [Validators.required,]],
        emergency_contact_number: [this.patient.emergencyDetails ? this.patient.emergencyDetails.emergency_contact_number : null, [Validators.required,]],
        _access_approved: [this.patient.emergencyDetails ? this.patient.emergencyDetails._access_approved : null, [Validators.required,]],
        mailId: [this.patient.emergencyDetails ? this.patient.emergencyDetails.mailId : null, [Validators.required]],
        _same_address: [true, [Validators.required]]
      }),
      languageKnown: [this.patient ? this.patient.languageKnown.map(x => x.id) : [], [Validators.required]],
      allergies: [this.patient ? this.patient.allergies.map(x => x.id) : [], [Validators.required]]
    });
  }

  onAddPatientDetails() {
    if (!this.addPatientDetailsForm.valid) {
      return;
    }
    this.ps.addPatientDetils(this.addPatientDetailsForm.value)
      .subscribe((patient) => {
        if (patient.status === 200) {
          toastSuccMessage.summary = patient.message;
          this.toastMessageSvc.displayToastMessage(toastSuccMessage);
          //re direct to view patient details page
          // this.router.navigate(['\'])
        }
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage);
      });
  }

  getLanguageKnownList() {
    this.ps.getLanguageKnownList()
      .subscribe((languages) => {
        this.languages = languages;
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage)
      });
  }

  getAllergies() {
    this.ps.getAllergies()
      .subscribe((allergies) => {
        this.allergies = allergies;
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage)
      });
  }

}
