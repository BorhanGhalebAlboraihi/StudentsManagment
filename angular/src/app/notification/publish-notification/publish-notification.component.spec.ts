import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishNotificationComponent } from './publish-notification.component';

describe('PublishNotificationComponent', () => {
  let component: PublishNotificationComponent;
  let fixture: ComponentFixture<PublishNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
