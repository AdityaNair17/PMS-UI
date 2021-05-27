import { Imedication, MedicationById } from './../model/model';
import { VisitService } from './../service/visit.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-visit-medication',
  templateUrl: './visit-medication.component.html',
  styleUrls: ['./visit-medication.component.scss']
})
export class VisitMedicationComponent implements OnInit {


  public medicationForm : FormGroup;
  public medications : Array<Imedication>;
  public disableFields : boolean = false;
  public displayButtons : boolean = true;
  @Output() submitClick : EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb : FormBuilder,
              private visitSvc : VisitService) {

   }

  ngOnInit(): void {
    this.createFormGroup();
    if(this.visitSvc.isEdit){
      this.visitSvc.getMedicationDetailsById().subscribe((response : MedicationById) => {
        if(response.successFlag){
          this.medications = [];
          response.medicationOnVisit.medication.forEach(md => {
            const index = this.medicationArray.value.length - 1;
            this.medications.push(md);
            const group = this.medicationArray.controls[index];
            group.get("medication").patchValue(this.medications[index]);
            group.get("dosage").patchValue(md.dosage);
            group.get("description").patchValue(md.description);
            this.addFormGroup();
          });
          this.removeLastMedication();
          this.disableFields = true;
          this.displayButtons = false;
        }
      })

    } else {
    this.visitSvc.getMedicationList().subscribe((medications : any) => {
      this.medications = medications.medicationList;
    })
  }
  }

  createFormGroup(){
    
    this.medicationForm = this.fb.group({
      medicationArray : this.fb.array([])
    });
    this.addFormGroup();
  }


  addFormGroup(){
    const tempForm = this.fb.group({
      medication : ['',[Validators.required]],
      dosage : ['', [Validators.required]],
      description : ['', [Validators.required]]
    });

    this.medicationArray.push(tempForm);
  }

  public get medicationArray(){
    return this.medicationForm.get('medicationArray') as FormArray;
  }

  medicationSelected(event, medication : FormGroup){
    const dosage = medication.controls.medication.value.dosage;
    const description = medication.controls.medication.value.description;
    medication.get("dosage").patchValue(dosage);
    medication.get("description").patchValue(description);
  }

  removeLastMedication(){
    const index = this.medicationArray.value.length - 1;
    this.medicationArray.removeAt(index);
  }

  submitVisit(){
    const medication = [];
    this.medicationArray.controls.forEach(md => {
      const obj = {
        description : md.get("description").value,
        dosage : md.get("dosage").value,
        medicineName : md.get("medication").value.medicineName,
        status : md.get("medication").value.status
      };
      medication.push(obj);
    });
    const reqObj = {
      medication : medication,
      patientId : this.visitSvc.PatientId,
      visitId : this.visitSvc.VisitId
    }
    this.visitSvc.postMedication(reqObj).subscribe(data => {
      console.log(data);
    })
    this.submitClick.emit();
  }
}
