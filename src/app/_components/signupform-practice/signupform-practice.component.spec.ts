import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupformPracticeComponent } from './signupform-practice.component';

describe('SignupformPracticeComponent', () => {
  let component: SignupformPracticeComponent;
  let fixture: ComponentFixture<SignupformPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupformPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupformPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
