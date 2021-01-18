import { Component, OnInit } from '@angular/core';
import { Image } from '../../Image';
import { Link } from '../../Link';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit {
  public logotype: Image = {
    url: '../assets/logo.png',
    alt: 'Logotype',
  };

  public logotypeLink: Link = {
    title: '',
    url: '#',
    class: 'header__navigation__logo',
    target: '_self',
  };

  public menuLinks: Link[] = [
    {
      url: '/',
      title: 'Home',
      target: '_self',
      class: 'header__menu__link',
    },
    {
      url: '/catalog',
      title: 'Catalog',
      target: '_self',
      class: 'header__menu__link',
    },
    {
      url: '/comparison',
      title: 'Сomparison',
      target: '_self',
      class: 'header__menu__link',
    },
  ];

  ngOnInit(): void {}
}
