import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { switchMap, take, tap } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { Product } from '../../Interfaces/Product';
import { CRUDServiceService } from '../../Services/crudservice.service';
import { Image } from '../../Interfaces/Image';
import { StoreService } from '../../Services/store.service';
import { Shop } from '../../Interfaces/Shop';
import { Wishlist } from '../../Interfaces/Wishlist';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  constructor(
    private crudServiceService: CRUDServiceService,
    private router: Router,
    private store: StoreService,
    private notification: NotificationsService,
  ) {}

  @Input()
  public product: Product;

  public cart: Product[];

  public image: Image;

  public user: any;

  ngOnInit(): void {
    this.image = {
      url: this.product.image,
      alt: this.product.title,
    };
  }

  public addToCart(): void {
    if (this.store.user) {
      this.crudServiceService
        .getQueryMultipleData('shops', {
          firstFieldPath: 'userID',
          firstValue: this.store.user.uid,
          secondFieldPath: 'status',
          secondValue: 'active',
        })
        .pipe(
          switchMap((value1: Shop[]) => {
            const shopCart: Shop = value1[0];
            if (!shopCart) {
              return this.crudServiceService.createEntity('shops', {
                cart: [this.product],
                userID: this.store.user.uid,
                status: 'active',
              });
            }
            shopCart.cart.push(this.product);
            this.notification.success('Успех', 'Товар успешно добавлен в корзину', {
              timeOut: 2500,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            return this.crudServiceService.updateCart('shops', shopCart.id, shopCart.cart);
          }),
          tap((value: string) => {
            this.store.shop = { id: value };
          }),
          take(1),
        )
        .subscribe();
    } else {
      this.notification.error('Ошибка', 'Сначала войдите в аккаунт', {
        timeOut: 2500,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
      this.router.navigate(['/login']);
    }
  }

  public addToWishlist(): void {
    if (this.store.user) {
      this.crudServiceService
        .getQueryData('wishlists', {
          fieldPath: 'uid',
          value: this.store.user.uid,
        })
        .pipe(
          switchMap((value1: Wishlist[]) => {
            const wishlist: Wishlist = value1[0];
            if (!wishlist) {
              return this.crudServiceService.createEntity('wishlists', {
                items: [this.product],
                uid: this.store.user.uid,
              });
            }
            const index = value1[0].items.findIndex((item) => item.id === this.product.id);
            if (index === -1) {
              wishlist.items.push(this.product);
              this.notification.success('Успех', 'Товар добавлен в список желаемого', {
                timeOut: 2500,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
              });
              return this.crudServiceService.updateWishlist(
                'wishlists',
                wishlist.id,
                wishlist.items,
              );
            }
            this.notification.error('Ошибка', 'Товар удалён из списка желаемого', {
              timeOut: 2500,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            const newWishlist = wishlist.items;
            newWishlist.splice(index, 1);
            return this.crudServiceService.updateWishlist('wishlists', wishlist.id, newWishlist);
          }),
          tap((value: string) => {
            this.store.wishlist = { id: value };
          }),
          take(1),
        )
        .subscribe();
    } else {
      this.notification.error('Ошибка', 'Сначала войдите в аккаунт', {
        timeOut: 2500,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
      this.router.navigate(['/login']);
    }
  }

  public addToComparisonList(): void {
    if (this.store.user) {
      this.crudServiceService
        .getQueryData('comparisons', {
          fieldPath: 'uid',
          value: this.store.user.uid,
        })
        .pipe(
          switchMap((value1: Wishlist[]) => {
            const comparison: Wishlist = value1[0];
            if (!comparison) {
              return this.crudServiceService.createEntity('comparisons', {
                items: [this.product],
                uid: this.store.user.uid,
              });
            }
            const index = value1[0].items.findIndex((item) => item.id === this.product.id);
            if (index === -1) {
              if (value1[0].items.length >= 4) {
                this.notification.error(
                  'Ошибка',
                  'Нельзя добавить больше 4 товаров в список сравнения',
                  {
                    timeOut: 2500,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true,
                  },
                );
              } else {
                comparison.items.push(this.product);
                this.notification.success('Успех', 'Товар добавлен в сравнение', {
                  timeOut: 2500,
                  showProgressBar: true,
                  pauseOnHover: true,
                  clickToClose: true,
                });
              }
              return this.crudServiceService.updateWishlist(
                'comparisons',
                comparison.id,
                comparison.items,
              );
            }
            this.notification.error('Ошибка', 'Товар удалён из сравнения', {
              timeOut: 2500,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            const newWishlist = comparison.items;
            newWishlist.splice(index, 1);
            return this.crudServiceService.updateWishlist(
              'comparisons',
              comparison.id,
              newWishlist,
            );
          }),
          tap((value: string) => {
            this.store.comparisonList = { id: value };
          }),
          take(1),
        )
        .subscribe();
    } else {
      this.notification.error('Ошибка', 'Сначала войдите в аккаунт', {
        timeOut: 2500,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
      this.router.navigate(['/login']);
    }
  }

  public toProduct(): void {
    this.router.navigate([`/product/${this.product.id}`]);
  }
}
