import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, filter, switchMap, takeWhile, tap } from 'rxjs/operators';
import { Product } from '../../Product';
import { Shop } from '../../Shop';
import { StoreService } from '../../store.service';
import { CRUDServiceService } from '../../crudservice.service';
import {Wishlist} from "../../Wishlist";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  public items: Product[] = [];

  private currentWishId: string;

  constructor(private storeService: StoreService, private crudServiceService: CRUDServiceService) {}

  ngOnInit(): void {
    this.storeService.wishlist$
      .pipe(
        filter((value) => {
          return !!value;
        }),
        tap((value: Shop) => {
          this.currentWishId = value.id;
          if (this.currentWishId) {
            this.currentWishId = value.id;
          }
        }),
        distinctUntilChanged((x, y) => {
          return x.id === y.id;
        }),
        switchMap((value) => {
          return this.crudServiceService.handleWishlist('wishlists', value.id).pipe(
            takeWhile((wishlist: Wishlist) => {
              return this.currentWishId === wishlist.id;
            }),
          );
        }),
        tap((value: Wishlist) => {
          this.items = value.items;
        }),
      )
      .subscribe();
  }
}
