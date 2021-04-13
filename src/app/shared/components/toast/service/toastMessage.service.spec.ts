/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToastMessageService } from './toastMessage.service';

describe('Service: ToastMessage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastMessageService]
    });
  });

  it('should ...', inject([ToastMessageService], (service: ToastMessageService) => {
    expect(service).toBeTruthy();
  }));
});
