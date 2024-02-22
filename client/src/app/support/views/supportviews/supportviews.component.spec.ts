import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportviewsComponent } from './supportviews.component';

describe('SupportviewsComponent', () => {
  let component: SupportviewsComponent;
  let fixture: ComponentFixture<SupportviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportviewsComponent]
    });
    fixture = TestBed.createComponent(SupportviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
