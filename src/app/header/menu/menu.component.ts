import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../../Link';
import { Icon } from '../../Icon';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input()
  public menuItems: Link[];

  public cartIcon: Icon = {
    class: 'fa fa-shopping-cart',
  };

  public cartLink: Link = {
    url: '#',
    title: '',
    target: '_self',
    class: 'cart__link',
  };

  public cartCountLink: Link = {
    url: '#',
    title: '3',
    target: '_self',
    class: 'cart-circle',
  };

  ngOnInit(): void {}
}
