import { Component, OnInit } from '@angular/core';
import { Image } from '../../Image';
import { Link } from '../../Link';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
})
export class HomeSliderComponent implements OnInit {
  public sliderItems: Image[] = [
    {
      url: './assets/home-slider-1.jpg',
      alt: 'Product Item №',
    },
    {
      url: './assets/home-slider-2.jpg',
      alt: 'Product Item №',
    },
    {
      url: './assets/home-slider-3.jpg',
      alt: 'Product Item №',
    },
  ];

  public sliderItemsCount: number = this.sliderItems.length;

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

  public nextSlide(): void {
    if (this.sliderCounter < this.sliderItemsCount - 1) {
      this.sliderCounter += 1;
    } else {
      this.sliderCounter = 0;
    }
  }

  public prevSlide(): void {
    if (this.sliderCounter <= 0) {
      this.sliderCounter = this.sliderItemsCount - 1;
    } else {
      this.sliderCounter -= 1;
    }
  }

  ngOnInit(): void {}
}
