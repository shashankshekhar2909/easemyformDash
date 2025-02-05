import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoverPageComponent } from './admin-cover-page.component';

describe('AdminCoverPageComponent', () => {
  let component: AdminCoverPageComponent;
  let fixture: ComponentFixture<AdminCoverPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCoverPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCoverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
