import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileviewComponent } from './editprofileview.component';

describe('EditprofileviewComponent', () => {
  let component: EditprofileviewComponent;
  let fixture: ComponentFixture<EditprofileviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditprofileviewComponent]
    });
    fixture = TestBed.createComponent(EditprofileviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
