import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSliderComponent } from './post-slider.component';

describe('PostSliderComponent', () => {
  let component: PostSliderComponent;
  let fixture: ComponentFixture<PostSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
