import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitVitalsComponent } from './visit-vitals.component';

describe('VisitVitalsComponent', () => {
  let component: VisitVitalsComponent;
  let fixture: ComponentFixture<VisitVitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitVitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
