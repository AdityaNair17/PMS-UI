import { AuthService } from 'src/app/auth/auth.service';
import { AppService } from './../../../../app.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast/service/toastMessage.service';
import { accessList, genderList, toastErrMessage, toastSuccMessage, addressType } from 'src/app/shared/constants/constants';
import { IAllergies, ILanguageKnown, IPatient } from '../../models/patientDetails-model';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  @Input() readonlyMode: boolean;
  @Input() patient: any;
  @Input() editMode: boolean = false;
  genderList: string[] = genderList;
  addressType: any[] = addressType;
  accessList: any[] = accessList;
  languages: ILanguageKnown[] = [];
  allergies: IAllergies[] = [];
  addPatientDetailsForm: FormGroup;
  private firstName : string;
  private lastName : string;
  private emailId : string;

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageSvc: ToastMessageService,
    private router: Router,
    private ps: PatientService,
    private appSvc : AppService,
    private authSvc : AuthService
  ) { }

  ngOnInit(): void {
    if(!this.editMode){
      this.firstName = this.authSvc.User.firstName;
      this.lastName = this.authSvc.User.lastName;
      this.emailId = this.authSvc.User.emailId;
    }
    this.buildForm();
    this.getLanguageKnownList();
    this.getAllergies();
  }

  buildForm() {
    this.addPatientDetailsForm = this.formBuilder.group({
      basicDetails: this.formBuilder.group({
        firstName: [this.patient && this.patient.basicDetails ? this.patient.basicDetails.firstName : !this.editMode ? this.firstName : null, [Validators.required,]],
        lastName: [this.patient && this.patient.basicDetails ? this.patient.basicDetails.lastName : !this.editMode ? this.lastName : null, [Validators.required,]],
        emailId: [this.patient && this.patient.basicDetails ? this.patient.basicDetails.emailId : !this.editMode ? this.emailId : null, [Validators.required,]],
        dateOfBirth: [this.patient && this.patient.basicDetails ? new Date(this.patient.basicDetails.dateOfBirth) : null, [Validators.required,]],
        contactNo: [this.patient && this.patient.basicDetails ? this.patient.basicDetails.contactNo : null, [Validators.required,]],
        age: [this.patient && this.patient.basicDetails ? this.patient.basicDetails.age : null, [Validators.required,]],
        gender: [this.patient && this.patient.basicDetails ? this.patient.basicDetails.gender : null, [Validators.required,]],
        race: [this.patient && this.patient.basicDetails ? this.patient.basicDetails.race : null],
        ethnicity: [this.patient && this.patient.basicDetails ? this.patient.basicDetails.ethnicity : null],
      }),
      address: this.formBuilder.group({
        addressLine : [this.patient && this.patient.address ? this.patient.address.addressLine : null, [Validators.required]],
        landmarkArea: [this.patient && this.patient.address ? this.patient.address.landmarkArea : null, [Validators.required,]],
        city: [this.patient && this.patient.address ? this.patient.address.city : null, [Validators.required,]],
        state: [this.patient && this.patient.address ? this.patient.address.state : null, [Validators.required,]],
        country: [this.patient && this.patient.address ? this.patient.address.country : null, [Validators.required,]],
        pin: [this.patient && this.patient.address ? this.patient.address.pin : null, [Validators.required,]],
        addressType: [this.patient && this.patient.address ? this.patient.address.addressType : null, [Validators.required]]
      }),
      emergencyDetails: this.formBuilder.group({
        emergency_first_name: [this.patient && this.patient.emergencyDetails ? this.patient.emergencyDetails.emergency_first_name : null, [Validators.required,]],
        emergency_last_name: [this.patient && this.patient.emergencyDetails ? this.patient.emergencyDetails.emergency_last_name : null, [Validators.required,]],
        emergency_relation_ship: [this.patient && this.patient.emergencyDetails ? this.patient.emergencyDetails.emergency_relation_ship : null, [Validators.required,]],
        emergency_contact_number: [this.patient && this.patient.emergencyDetails ? this.patient.emergencyDetails.emergency_contact_number : null, [Validators.required,]],
        _access_approved: [this.patient && this.patient.emergencyDetails ? this.patient.emergencyDetails._access_approved : null, [Validators.required,]],
        mailId: [this.patient && this.patient.emergencyDetails ? this.patient.emergencyDetails.mailId : null, [Validators.required]],
        _same_address: [true, [Validators.required]]
      }),
      languageKnown: [this.patient ? this.patient.languageKnownObject.map(x => x.id) : [], [Validators.required]],
      allergies: [this.patient ? this.patient.allergiesObject.map(x => x.id) : [], [Validators.required]]
    });
  }

  onAddPatientDetails() {
    if (!this.addPatientDetailsForm.valid) {
      return;
    }
    if(this.editMode){
      this.editUserDetails();
    } else {
      let reqObj = {
        user_id_fk : this.authSvc.User.id,
        basicDetails : this.addPatientDetailsForm.value.basicDetails,
        address : this.addPatientDetailsForm.value.address,
        emergencyDetails: this.addPatientDetailsForm.value.emergencyDetails,
        languageKnown: this.addPatientDetailsForm.value.languageKnown,
        allergies: this.addPatientDetailsForm.value.allergies
      }
      reqObj.basicDetails.dateOfBirth = this.appSvc.FormatDate(reqObj.basicDetails.dateOfBirth);
    this.ps.addPatientDetils(reqObj)
      .subscribe(patient => {
        if (patient.status === 201) {
          toastSuccMessage.summary = patient.message;
          this.toastMessageSvc.displayToastMessage(toastSuccMessage);
          this.authSvc.PersonalDetailsRequired = false;
          this.authSvc.StoreSession();
          this.ps.upatedPatientDetailsRequirement(false, false, this.authSvc.User.id).subscribe((resp) => {
            console.log(resp);
          })
          //re direct to view patient details page
          this.router.navigate(['/layout/home']);
        }
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage);
      });
    }

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


  editUserDetails(){
    let reqObj = {
      user_id_fk : "APT50e2a882-abc4-4df4-a1f1-480f3731a635",
      basicDetails : this.addPatientDetailsForm.value.basicDetails,
      address : this.addPatientDetailsForm.value.address,
      emergencyDetails: this.addPatientDetailsForm.value.emergencyDetails,
      languageKnown: this.addPatientDetailsForm.value.languageKnown,
      allergies: this.addPatientDetailsForm.value.allergies,
      id: this.patient.id
    }
    Object.assign(reqObj.basicDetails, {id : this.patient.basicDetails.id});
    Object.assign(reqObj.address, {id : this.patient.address.id});
    Object.assign(reqObj.emergencyDetails, {id : this.patient.emergencyDetails.id});
    reqObj.basicDetails.dateOfBirth = this.appSvc.FormatDate(reqObj.basicDetails.dateOfBirth);
      this.ps.updatePatientDetails(reqObj).subscribe((resp) => {
        this.router.navigate(['/layout/home/patient/list']);
      })
  }
}
