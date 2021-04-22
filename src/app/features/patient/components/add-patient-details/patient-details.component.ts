import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast/service/toastMessage.service';
import { accessList, genderList, toastErrMessage, toastSuccMessage } from 'src/app/shared/constants/constants';
import { IAllergies, ILanguageKnown } from '../../models/patientDetails-model';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
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
        firstName: [null, [Validators.required,]],
        lastName: [null, [Validators.required,]],
        emailId: [null, [Validators.required,]],
        dateOfBirth: [null, [Validators.required,]],
        contactNo: [null, [Validators.required,]],
        age: [null, [Validators.required,]],
        gender: [null, [Validators.required,]],
        race: [null],
        ethnicity: [null],
      }),
      address: this.formBuilder.group({
        landmarkArea: [null, [Validators.required,]],
        city: [null, [Validators.required,]],
        state: [null, [Validators.required,]],
        country: [null, [Validators.required,]],
        pin: [null, [Validators.required,]],
        addressType: [null, [Validators.required]]
      }),
      emergency_Details: this.formBuilder.group({
        emergency_first_name: [null, [Validators.required,]],
        emergency_last_name: [null, [Validators.required,]],
        emergency_relation_ship: [null, [Validators.required,]],
        emergency_contact_number: [null, [Validators.required,]],
        _access_approved: [null, [Validators.required,]],
        mailId: [null, [Validators.required]],
        _same_address: [true, [Validators.required]]
      }),
      languageKnown: [[], [Validators.required]],
      allergies: [[], [Validators.required]]
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
