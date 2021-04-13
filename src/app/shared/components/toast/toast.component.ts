import { ToastMessageBody } from './interface/toastMessageBody';
import { pmsConstants } from './../../constants/constants';
import { ToastMessageService } from './service/toastMessage.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers : [MessageService]
})
export class ToastComponent implements OnInit {

  private subscription;
  public CONSTANT = pmsConstants;
  constructor(private messageSvc: MessageService, private toastSvc : ToastMessageService) {   }

  ngOnInit(): void {
    this.subscription = this.toastSvc.toastObservable.subscribe((message : ToastMessageBody) => {    
      this.messageSvc.add(message);

      if(!message.life){
      setTimeout(() => {
        this.messageSvc.clear();
      }, this.CONSTANT.TOAST_MESSAGE_TIMEOUT);
    }
    });
  }

}
