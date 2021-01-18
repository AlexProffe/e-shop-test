import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../Product';
import { Wishlist } from '../../../Wishlist';
import { CRUDServiceService } from '../../../crudservice.service';
import { StoreService } from '../../../store.service';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss'],
})
export class WishlistItemComponent implements OnInit {
  @Input() public item: Product;

  public wishList: Wishlist;

  constructor(
    private router: Router,
    private crudServiceService: CRUDServiceService,
    private storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.storeService.wishlist$.subscribe((value: Wishlist) => {
      this.wishList = value;
    });
  }

  public removeItem(value): void {
    const index = this.wishList.items.findIndex((item) => item.id === value.id);
    const newWishlist = this.wishList.items.splice(index, 1);
    this.crudServiceService.updateWishlist('wishlists', this.wishList.id, this.wishList.items);
  }

  public moreInfo(): void {
    this.router.navigate([`/product/${this.item.id}`]);
  }
}
