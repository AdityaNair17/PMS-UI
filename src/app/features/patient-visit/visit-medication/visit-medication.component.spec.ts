import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitMedicationComponent } from './visit-medication.component';

describe('VisitMedicationComponent', () => {
  let component: VisitMedicationComponent;
  let fixture: ComponentFixture<VisitMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitMedicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
