import { Component, OnInit } from '@angular/core';
import { Image } from '../../Image';
import { Link } from '../../Link';
import { CRUDServiceService } from '../../crudservice.service';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
})
export class HomeSliderComponent implements OnInit {
  public sliderItems: Image[] = [];

  public sliderItemsCount: number;

  public sliderCounter = 0;

  public sliderArrowLeftLink: Link = {
    url: '#',
    class: 'slider__arrow arrow--left',
    target: '_self',
    title: '',
  };

  public sliderArrowRightLink: Link = {
    url: '#',
    class: 'slider__arrow arrow--right',
    target: '_self',
    title: '',
  };

  public sliderArrowImage: Image = {
    url: './assets/arrow-left.png',
    alt: 'arrow-left',
  };

  public sliderArrowRightImg: Image = {
    url: './assets/arrow-right.png',
    alt: 'arrow-left',
  };

  public nextSlide($event): void {
    $event.preventDefault();
    this.sliderItemsCount = this.sliderItems.length;
    if (this.sliderCounter < this.sliderItemsCount - 1) {
      this.sliderCounter += 1;
    } else {
      this.sliderCounter = 0;
    }
  }

  constructor(private crudServiceService: CRUDServiceService) {}

  public prevSlide($event): void {
    $event.preventDefault();
    this.sliderItemsCount = this.sliderItems.length;
    if (this.sliderCounter <= 0) {
      this.sliderCounter = this.sliderItemsCount - 1;
    } else {
      this.sliderCounter -= 1;
    }
  }

  ngOnInit(): void {
    this.crudServiceService.getData<Image>('slider').subscribe((value: Image[]) => {
      this.sliderItems = value;
    });
  }
}
