import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCVComponent } from './user-cv.component';

describe('UserCVComponent', () => {
  let component: UserCVComponent;
  let fixture: ComponentFixture<UserCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
