import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendar2Component } from './calendar2.component';

describe('Calendar2Component', () => {
  let component: Calendar2Component;
  let fixture: ComponentFixture<Calendar2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar2Component]
    });
    fixture = TestBed.createComponent(Calendar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
