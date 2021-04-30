import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as medicationList from '../../../../assets/json/medicationList.json';
import * as medicationById from '../../../../assets/json/medicationById.json';
import * as procedureList from '../../../../assets/json/procedureList.json';
import * as procedureById from '../../../../assets/json/procedureById.json';
import * as diagnosisList from '../../../../assets/json/diagnosisList.json';
import * as diagnosisById from '../../../../assets/json/diagnosisById.json';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private visitId : string = "123";
  private medicationObj : any

  constructor() { }


  public get VisitId(){
    return this.visitId;
  }

  public set VisitId(id : string){
    this.visitId = id;
  }
  getMedicationList(){
    return of((medicationList as any).default);
  }


  getMedicationDetailsById(){
    return of((medicationById as any).default);
  }

  getProcedureList(){
    return of((procedureList as any).default);
  }

  getProcedureDetailsById(){
    return of((procedureById as any).default);
  }

  getDiagnosisList(){
    return of((diagnosisList as any).default);
  }

  getDiagnosisById(){
    return of((diagnosisById as any).default);
  }
}
