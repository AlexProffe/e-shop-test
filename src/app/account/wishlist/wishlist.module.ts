import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { WishlistItemComponent } from './wishlist-item/wishlist-item.component';

@NgModule({
  declarations: [WishlistComponent, WishlistItemComponent],
  imports: [CommonModule],
})
export class WishlistModule {}
