import { VisitVitalsComponent } from './visit-vitals/visit-vitals.component';
import { VisitDiagnosisComponent } from './visit-diagnosis/visit-diagnosis.component';
import { VisitProcedureComponent } from './visit-procedure/visit-procedure.component';
import { VisitMedicationComponent } from './visit-medication/visit-medication.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.scss']
})
export class PatientVisitComponent implements OnInit {

  @ViewChild(VisitMedicationComponent) medication : VisitMedicationComponent;
  @ViewChild(VisitProcedureComponent) procedure : VisitProcedureComponent;
  @ViewChild(VisitDiagnosisComponent) diagnosis : VisitDiagnosisComponent;
  @ViewChild(VisitVitalsComponent) vitals : VisitVitalsComponent;

  public stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  }; 

  public config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ],
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

  isProcedureValid(){
    if(this.procedure && this.procedure.procedureForm && this.procedure.procedureForm.valid){
      return true;
    } else{
      return false;
    }
  }

  isVitalsValid(){
    if(this.vitals && this.vitals.vitalsForm && this.vitals.vitalsForm.valid){
      return true;
    } else {
      return false;
    }
  }

  isDiagnosisValid(){
    if(this.diagnosis && this.diagnosis.diagnosisForm && this.diagnosis.diagnosisForm.valid){
      return true;
    } else {
      return false;
    }
  }

  isMedicationValid(){
    if(this.medication && this.medication.medicationForm && this.medication.medicationForm.valid){
      return true;
    } else {
      return false;
    }
  }
}
