import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast/service/toastMessage.service';
import { toastErrMessage } from 'src/app/shared/constants/constants';
import { HistoryService } from '../history.service';
import { IHistoryList } from '../models/history-model';

@Component({
  selector: 'app-history-container',
  templateUrl: './history-container.component.html',
  styleUrls: ['./history-container.component.scss']
})
export class HistoryContainerComponent implements OnInit {

  historyList: IHistoryList[] = [];
  constructor(
    private toastMessageSvc: ToastMessageService,
    private HS: HistoryService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getHistoryList(this.authService.UserRole === 'Patient' ? this.authService.User.emailId : null);
  }

  getHistoryList(user?: string) {
    this.HS.getAllHistory()
      .subscribe((historyList) => {
        this.historyList = historyList;
      }, (err) => {
        this.toastMessageSvc.displayToastMessage(toastErrMessage)
      });
  }

}
