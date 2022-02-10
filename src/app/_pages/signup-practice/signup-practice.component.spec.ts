import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPracticeComponent } from './signup-practice.component';

describe('SignupPracticeComponent', () => {
  let component: SignupPracticeComponent;
  let fixture: ComponentFixture<SignupPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
