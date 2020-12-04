import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderItemComponent } from './home-slider-item.component';

describe('HomeSliderItemComponent', () => {
  let component: HomeSliderItemComponent;
  let fixture: ComponentFixture<HomeSliderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeSliderItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSliderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
