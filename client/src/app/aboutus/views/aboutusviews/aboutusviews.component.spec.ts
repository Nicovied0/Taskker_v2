import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusviewsComponent } from './aboutusviews.component';

describe('AboutusviewsComponent', () => {
  let component: AboutusviewsComponent;
  let fixture: ComponentFixture<AboutusviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutusviewsComponent]
    });
    fixture = TestBed.createComponent(AboutusviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
