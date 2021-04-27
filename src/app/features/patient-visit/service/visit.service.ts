import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as medicationList from '../../../../assets/json/medicationList.json';
import * as medicationById from '../../../../assets/json/medicationById.json';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private visitId : string = null;
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
}
