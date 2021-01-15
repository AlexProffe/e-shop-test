import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import firebase from 'firebase';
import { distinctUntilChanged, filter, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { Product } from '../../Product';
import { StoreService } from '../../store.service';
import { CRUDServiceService } from '../../crudservice.service';
import { Shop } from '../../Shop';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public cartItems: Product[] = [];

  public user: firebase.User;

  public cartStatus = false;

  public cartID: string;

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

  constructor(private storeService: StoreService, private crudServiceService: CRUDServiceService) {}

  private currentShopId: string;

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

  public deleteProduct(index): void {
    this.cartItems.splice(index, 1);

    this.cartCountLink = {
      url: '#',
      title: `${this.cartItems.length}`,
      target: '_self',
      class: 'cart-circle',
    };
    this.crudServiceService
      .getQueryMultipleData('shops', {
        firstFieldPath: 'userID',
        firstValue: this.storeService.user.uid,
        secondFieldPath: 'status',
        secondValue: 'active',
      })
      .pipe(
        switchMap((shopValue: Shop[]) => {
          const shop = shopValue[0];
          return this.crudServiceService.updateCart('shops', this.currentShopId, this.cartItems);
        }),
        tap((value: string) => {
          this.storeService.shop = { id: value };
        }),
        take(1),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.storeService.shop$
      .pipe(
        filter((value) => {
          return !!value;
        }),
        tap((value: Shop) => {
          this.currentShopId = value.id;
          if (this.currentShopId) {
            this.currentShopId = value.id;
          }
        }),
        distinctUntilChanged((x, y) => {
          return x.id === y.id;
        }),
        switchMap((value) => {
          return this.crudServiceService.handleShop('shops', value.id).pipe(
            takeWhile((shop: Shop) => {
              return this.currentShopId === shop.id;
            }),
          );
        }),
        tap((value: Shop) => {
          this.cartItems = value.cart;
          this.cartCountLink = {
            url: '#',
            title: `${this.cartItems.length}`,
            target: '_self',
            class: 'cart-circle',
          };
          return this.crudServiceService
            .getQueryData('users', {
              fieldPath: 'uid',
              value: this.storeService.user.uid,
            })
            .pipe(
              tap((value1: firebase.User[]) => {
                console.log(value1);
                this.storeService.user = value1[0];
                return [];
              }),
            );
        }),
      )
      .subscribe();
  }
}
