import { Component, ContentChild, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { Product } from '../../Product';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public cartItems: Product[] = [
    {
      count: 22222,
      title: 'Product title №12',
      description: 'Some words about this Product',
      image:
        'https://firebasestorage.googleapis.com/v0/b/e-shop-courses.appspot.com/o/portfolio-1.png?alt=media&token=2a414ab7-0979-4c0b-8534-db524b92d83f',
      price: 110,
      sale: 80,
      id: 'rLl2NpqGOV2WBUTLUcBc',
    },
  ];

  public user: firebase.User;

  public cartStatus = false;

  public burgerStatus = false;

  public cartCountLink: Link = {
    url: '#',
    title: `${this.cartItems.length}`,
    target: '_self',
    class: 'cart-circle',
  };

  public cartLink: Link = {
    url: '#',
    title: '',
    target: '_self',
    class: 'cart__link',
  };

  constructor(private store: StoreService) {}

  @Input()
  public menuItems: Link[];

  public cartIcon: Icon = {
    class: 'fa fa-shopping-cart',
  };

  public stopEvent(event): void {
    event.stopPropagation();
  }

  @ViewChild('cartContent')
  cartContent: ElementRef;

  public openCart($event): void {
    $event.preventDefault();
    this.cartStatus = !this.cartStatus;
  }

  public openBurger($event): void {
    $event.preventDefault();
    this.burgerStatus = !this.burgerStatus;
  }

  ngOnInit(): void {
    this.store.user$.subscribe((value: firebase.User) => {
      this.user = value;
      setTimeout(() => {
        console.log(this.user);
      }, 0);
    });
  }
}
