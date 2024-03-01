import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendar3Component } from './calendar3.component';

describe('Calendar3Component', () => {
  let component: Calendar3Component;
  let fixture: ComponentFixture<Calendar3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar3Component]
    });
    fixture = TestBed.createComponent(Calendar3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
