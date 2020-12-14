import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../Product';
import { CRUDServiceService } from '../../crudservice.service';
import { Image } from '../../Image';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  constructor(private crudServiceService: CRUDServiceService, private router: Router) {}

  @Input()
  public product: Product;

  public image: Image;

  ngOnInit(): void {
    this.image = {
      url: this.product.image,
      alt: this.product.title,
    };
  }

  public addToCart(): void {
    console.log(this.product.id);
  }

  public toProduct(): void {
    this.router.navigate([`/product/${this.product.id}`]);
  }
}
