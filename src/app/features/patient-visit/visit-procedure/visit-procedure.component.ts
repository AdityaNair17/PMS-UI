import { IProcedure } from './../model/model';
import { VisitService } from './../service/visit.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-procedure',
  templateUrl: './visit-procedure.component.html',
  styleUrls: ['./visit-procedure.component.scss']
})
export class VisitProcedureComponent implements OnInit {

  public procedureForm : FormGroup;
  public procedures : Array<IProcedure>
  public displayButtons : boolean = true;
  public disableFields : boolean = false;
  constructor(private fb : FormBuilder,
              private visitSvc : VisitService) { }

  ngOnInit(): void {
    this.createFormGroup();

    if(this.visitSvc.isEdit) {
      this.visitSvc.getProcedureDetailsById().subscribe(response => {
        if(response.successFlag){
          this.procedures = [];
          response.procedureMain.forEach(pd => {
              const obj = {
                procedureId : pd.id,
                procedureName : pd.name
              }
              this.procedures.push(obj);
              const index = this.procedureArray.controls.length - 1;
              const group = this.procedureArray.controls[index];
              group.get("procedure").patchValue(this.procedures[index]);
              group.get("description").patchValue(pd.description);
              this.addFormGroup();
          });
          this.removeLastProcedure();
          this.disableFields = true;
          this.displayButtons = false;
        }

      })
    } else {
    this.visitSvc.getProcedureList().subscribe(procedure => {
      this.procedures = procedure.procedureMaster;
    })
  }
  }

  createFormGroup(){
    this.procedureForm = this.fb.group({
      procedureArray : this.fb.array([])
    });
    this.addFormGroup();
  }

  addFormGroup(){
    const form = this.fb.group({
      procedure : ['', [Validators.required]],
      description : ['', [Validators.required]]
    });
    this.procedureArray.push(form);
  }

  removeLastProcedure(){
    const index = this.procedureArray.value.length - 1;
    this.procedureArray.removeAt(index);
  } 
  public get procedureArray(){
    return this.procedureForm.get("procedureArray") as FormArray;
  }

  storeProcedure(){
    const procedureDetails = [];
    this.procedureArray.controls.forEach((pc) => {
      const obj = {
        id : pc.get("procedure").value.procedureId,
        name : pc.get("procedure").value.procedureName,
        description : pc.get("description").value
      }
      procedureDetails.push(obj);
    });

    const reqBody = {
      patient_visit_id : this.visitSvc.VisitId,
      procedure_details : procedureDetails,
    }

    this.visitSvc.postProcedure(reqBody).subscribe((response) => {
      console.log(response);
    });
  }
}
