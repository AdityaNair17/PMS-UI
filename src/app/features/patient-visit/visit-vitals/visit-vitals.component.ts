import { VisitService } from './../service/visit.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-vitals',
  templateUrl: './visit-vitals.component.html',
  styleUrls: ['./visit-vitals.component.scss']
})
export class VisitVitalsComponent implements OnInit {

  public vitalsForm : FormGroup;
  private numberRegex : string = '^\\d*\\.?\\d*$';
  public disableFields : boolean = false;

  constructor(private fb : FormBuilder,
              private visitSvc : VisitService) { }

  ngOnInit(): void {
  
    this.createFormGroup();
    if(this.visitSvc.isEdit){
      this.visitSvc.getVitalsById().subscribe((vitals) => {
        this.vitalsForm.setValue({
          height : vitals.height,
          weight : vitals.weight,
          systolic : vitals.systolic,
          diastolic : vitals.diastolic,
          temperature : vitals.temperature,
          respirationRate : vitals.respirationRate
        })
        this.disableFields = true;
      })
      
    }

  }

  createFormGroup(){
    this.vitalsForm = this.fb.group({
      height : ['', [Validators.required, Validators.pattern(this.numberRegex)]],
      weight : ['', [Validators.required, Validators.pattern(this.numberRegex)]],
      systolic : ['',[Validators.required, Validators.pattern(this.numberRegex)]],
      diastolic : ['',[Validators.required, Validators.pattern(this.numberRegex)]],
      temperature : ['', [Validators.required, Validators.pattern(this.numberRegex)]],
      respirationRate : ['', [Validators.required, Validators.pattern(this.numberRegex)]]
    });
  }

  submitVitals(){
    const reqBody = {
      height : this.vitalsForm.get("height").value,
      weight : this.vitalsForm.get("weight").value,
      systolic : this.vitalsForm.get("systolic").value,
      diastolic : this.vitalsForm.get("diastolic").value,
      temperature : this.vitalsForm.get("temperature").value,
      respirationRate : this.vitalsForm.get("respirationRate").value
    }
    console.log(reqBody);
  }
}
