import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLinkComponent } from './image-link.component';

describe('ImageLinkComponent', () => {
  let component: ImageLinkComponent;
  let fixture: ComponentFixture<ImageLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageLinkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
