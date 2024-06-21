import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobsComponent } from './add-jobs.component';

describe('AddJobsComponent', () => {
  let component: AddJobsComponent;
  let fixture: ComponentFixture<AddJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
