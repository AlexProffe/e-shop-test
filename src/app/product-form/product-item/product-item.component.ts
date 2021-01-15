import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { switchMap, take, tap } from 'rxjs/operators';
import { Product } from '../../Product';
import { CRUDServiceService } from '../../crudservice.service';
import { Image } from '../../Image';
import { StoreService } from '../../store.service';
import { Shop } from '../../Shop';
import { Wishlist } from '../../Wishlist';

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
            return this.crudServiceService.updateCart('shops', shopCart.id, shopCart.cart);
          }),
          tap((value: string) => {
            this.store.shop = { id: value };
          }),
          take(1),
        )
        .subscribe();
    } else {
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
              return this.crudServiceService.updateWishlist(
                'wishlists',
                wishlist.id,
                wishlist.items,
              );
            }
            console.log('All ok');
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
      this.router.navigate(['/login']);
    }
  }

  public toProduct(): void {
    this.router.navigate([`/product/${this.product.id}`]);
  }
}
