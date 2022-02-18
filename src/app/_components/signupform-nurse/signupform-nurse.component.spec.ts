import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupformNurseComponent } from './signupform-nurse.component';

describe('SignupformNurseComponent', () => {
  let component: SignupformNurseComponent;
  let fixture: ComponentFixture<SignupformNurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupformNurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupformNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
