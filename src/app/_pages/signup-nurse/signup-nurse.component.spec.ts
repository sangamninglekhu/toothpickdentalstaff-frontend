import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupNurseComponent } from './signup-nurse.component';

describe('SignupNurseComponent', () => {
  let component: SignupNurseComponent;
  let fixture: ComponentFixture<SignupNurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupNurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
