import { ToastMessageBody } from './../interface/toastMessageBody';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  private showToast: BehaviorSubject<ToastMessageBody> = new BehaviorSubject<ToastMessageBody>({ severity: null, summary: null });
  constructor() { }

  public get toastObservable() : BehaviorSubject<ToastMessageBody> {
    return this.showToast;
  }

  public displayToastMessage(toastMessage : ToastMessageBody){
    this.showToast.next(toastMessage);
  }
}
