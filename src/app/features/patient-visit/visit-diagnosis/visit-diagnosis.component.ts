import { IDiagnosis } from './../model/model';
import { VisitService } from './../service/visit.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-diagnosis',
  templateUrl: './visit-diagnosis.component.html',
  styleUrls: ['./visit-diagnosis.component.scss']
})
export class VisitDiagnosisComponent implements OnInit {

  public diagnosisForm : FormGroup;
  public diagnosisList : Array<IDiagnosis>
  public disableFields : boolean = false;
  public displayButtons : boolean = true;
  constructor(private fb : FormBuilder,
              private visitSvc : VisitService) { }

  ngOnInit(): void {
    this.createFormGroup();

    if(this.visitSvc.isEdit){

      this.visitSvc.getDiagnosisById().subscribe(response => {
        if(response.successFlag){
          this.diagnosisList = [];
          response.diagnosis.forEach(response => {
            const index = this.diagnosisArray.controls.length - 1;
            const group = this.diagnosisArray.controls[index];
            const obj = {
              diagnosisId : response.diagnosisId,
              diagnosisName : response.name
            }
            this.diagnosisList.push(obj);
            group.get("diagnosis").patchValue(this.diagnosisList[index]);
            group.get("description").patchValue(response.description);
            this.addFormGroup();
          });
          this.removeLastDiagnosis();
          this.disableFields = true;
          this.displayButtons = false;
        }
      })

    } else {
      this.visitSvc.getDiagnosisList().subscribe(response => {
        if(response.successFlag){
          this.diagnosisList = response.diagnosisMaster;
        }
      })
    }
  }

  createFormGroup(){
    this.diagnosisForm = this.fb.group({
      diagnosisArray : this.fb.array([])
    });
    this.addFormGroup();
  }


  public get diagnosisArray(){
    return this.diagnosisForm.get("diagnosisArray") as FormArray;
  }

  addFormGroup(){
    const group = this.fb.group({
      diagnosis : ['', Validators.required],
      description : ['', Validators.required]
    });
    this.diagnosisArray.push(group);
  }

  removeLastDiagnosis(){
    const index = this.diagnosisArray.controls.length - 1;
    this.diagnosisArray.removeAt(index);
  }

  storeDiagnosis(){
    const diagnosisDetails = [];
    this.diagnosisArray.controls.forEach(group => {
      const obj = {
        id : group.get("diagnosis").value.diagnosisId,
        name :  group.get("diagnosis").value.diagnosisName,
        description : group.get("description").value
      }
      diagnosisDetails.push(obj);
    });

    const reqBody = {
      patient_visit_id : "123",
      diagnosis_details : diagnosisDetails
    }

    console.log(reqBody);
  }
}
