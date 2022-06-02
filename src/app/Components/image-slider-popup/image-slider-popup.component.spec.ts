import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSliderPopupComponent } from './image-slider-popup.component';

describe('ImageSliderPopupComponent', () => {
  let component: ImageSliderPopupComponent;
  let fixture: ComponentFixture<ImageSliderPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSliderPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSliderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
