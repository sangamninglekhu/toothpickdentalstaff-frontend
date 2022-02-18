import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerformComponent } from './careerform.component';

describe('CareerformComponent', () => {
  let component: CareerformComponent;
  let fixture: ComponentFixture<CareerformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
