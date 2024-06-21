import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCVComponent } from './update-cv.component';

describe('UpdateCVComponent', () => {
  let component: UpdateCVComponent;
  let fixture: ComponentFixture<UpdateCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
