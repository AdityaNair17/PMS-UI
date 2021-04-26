import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDiagnosisComponent } from './visit-diagnosis.component';

describe('VisitDiagnosisComponent', () => {
  let component: VisitDiagnosisComponent;
  let fixture: ComponentFixture<VisitDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitDiagnosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
