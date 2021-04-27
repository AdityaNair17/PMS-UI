import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-procedure',
  templateUrl: './visit-procedure.component.html',
  styleUrls: ['./visit-procedure.component.scss']
})
export class VisitProcedureComponent implements OnInit {

  public procedureForm : FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
  }

  createFormGroup(){
    this.procedureForm = this.fb.group({
      procedureArray : this.fb.array([])
    })
  }

  addFormGroup(){
    const form = this.fb.group({
      procedure : ['', [Validators.required]],
      description : ['', [Validators.required]]
    });
    this.procedureArray.push(form);
  }

  public get procedureArray(){
    return this.procedureForm.get("procedureArray") as FormArray;
  }
}
