import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizeComponent } from './optimize.component';

describe('OptimizeComponent', () => {
  let component: OptimizeComponent;
  let fixture: ComponentFixture<OptimizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptimizeComponent]
    });
    fixture = TestBed.createComponent(OptimizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
