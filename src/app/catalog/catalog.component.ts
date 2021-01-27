import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Product';
import { CRUDServiceService } from '../crudservice.service';
import { PaginationService } from '../pagination.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public productsList: Product[] = [];

  constructor(private crudServiceService: CRUDServiceService, public page: PaginationService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public scrollHandler(e) {
    console.log(e);
  }

  public filter(value): void {
    const queryValue: string = value.target.value;
    switch (queryValue) {
      case 'nameDesc':
        console.log('nameDesc');
        this.crudServiceService
          .getFilterProducts<Product>('products', 'title', 'desc', 100)
          .subscribe((products: Product[]) => {
            this.productsList = products;
          });
        break;
      case 'nameAsc':
        console.log('nameAsc');
        this.crudServiceService
          .getFilterProducts<Product>('products', 'title', 'asc', 100)
          .subscribe((products: Product[]) => {
            this.productsList = products;
          });
        break;
      case 'priceDesc':
        console.log('priceDesc');
        this.crudServiceService
          .getFilterProducts<Product>('products', 'price', 'desc',100)
          .subscribe((products: Product[]) => {
            this.productsList = products;
          });
        break;
      case 'priceAsc':
        console.log('priceAsc');
        this.crudServiceService
          .getFilterProducts<Product>('products', 'title', 'asc',100)
          .subscribe((products: Product[]) => {
            this.productsList = products;
          });
        break;
      case 'sale':
        console.log('sale');
        this.crudServiceService
          .getFilterProducts<Product>('products', 'sale', 'asc',100)
          .subscribe((products: Product[]) => {
            this.productsList = products;
          });
        break;
      default:
        console.log('default');
        break;
    }
  }

  public getProducts(): void {
    this.crudServiceService
      .getFilterProducts<Product>('products', 'title', 'asc',100)
      .subscribe((value: Product[]) => {
        this.productsList = value;
      });
  }
}
