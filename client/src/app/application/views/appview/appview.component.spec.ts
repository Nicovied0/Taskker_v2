import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppviewComponent } from './appview.component';

describe('AppviewComponent', () => {
  let component: AppviewComponent;
  let fixture: ComponentFixture<AppviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppviewComponent]
    });
    fixture = TestBed.createComponent(AppviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
