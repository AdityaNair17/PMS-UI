import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxContainerComponent } from './inbox-container.component';

describe('InboxContainerComponent', () => {
  let component: InboxContainerComponent;
  let fixture: ComponentFixture<InboxContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
