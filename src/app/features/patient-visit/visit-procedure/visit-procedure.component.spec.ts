import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitProcedureComponent } from './visit-procedure.component';

describe('VisitProcedureComponent', () => {
  let component: VisitProcedureComponent;
  let fixture: ComponentFixture<VisitProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
