import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeviewsComponent } from './homeviews.component';

describe('HomeviewsComponent', () => {
  let component: HomeviewsComponent;
  let fixture: ComponentFixture<HomeviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeviewsComponent]
    });
    fixture = TestBed.createComponent(HomeviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
