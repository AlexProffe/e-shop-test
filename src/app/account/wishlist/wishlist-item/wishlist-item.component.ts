import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../Product';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss'],
})
export class WishlistItemComponent implements OnInit {
  @Input() public item: Product;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public moreInfo(): void {
    this.router.navigate([`/product/${this.item.id}`]);
  }
}
