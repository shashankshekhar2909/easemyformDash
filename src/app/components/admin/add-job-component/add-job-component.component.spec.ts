import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobComponentComponent } from './add-job-component.component';

describe('AddJobComponentComponent', () => {
  let component: AddJobComponentComponent;
  let fixture: ComponentFixture<AddJobComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddJobComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJobComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
