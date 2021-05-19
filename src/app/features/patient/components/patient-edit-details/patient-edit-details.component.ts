import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-edit-details',
  templateUrl: './patient-edit-details.component.html',
  styleUrls: ['./patient-edit-details.component.scss']
})
export class PatientEditDetailsComponent implements OnInit {
  editMode: boolean = true;
  patientId : string = '';
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('id');
    })
  }

}
