import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Interfaces/Product';
import { CRUDServiceService } from '../Services/crudservice.service';
import { PaginationService } from '../Services/pagination.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public productsList: Product[] = [];

  public pageNumber = 1;

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
          .getFilterProducts<Product>('products', 'title', 'desc', 100, 1)
          .subscribe((products: Product[]) => {
            this.pageNumber = 1;
            this.productsList = products.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
          });
        break;
      case 'nameAsc':
        console.log('nameAsc');
        this.crudServiceService
          .getFilterProducts<Product>('products', 'title', 'asc', 100, 1)
          .subscribe((products: Product[]) => {
            this.pageNumber = 1;
            this.productsList = products.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
          });
        break;
      case 'priceDesc':
        console.log('priceDesc');
        this.crudServiceService
          .getFilterProducts<Product>('products', 'price', 'desc', 100, 1)
          .subscribe((products: Product[]) => {
            this.pageNumber = 1;
            this.productsList = products.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
          });
        break;
      case 'priceAsc':
        console.log('priceAsc');
        this.crudServiceService
          .getFilterProducts<Product>('products', 'title', 'asc', 100, 1)
          .subscribe((products: Product[]) => {
            this.pageNumber = 1;
            this.productsList = products.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
          });
        break;
      case 'sale':
        console.log('sale');
        this.crudServiceService
          .getFilterProducts<Product>('products', 'sale', 'asc', 100, 1)
          .subscribe((products: Product[]) => {
            this.pageNumber = 1;
            this.productsList = products.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
          });
        break;
      default:
        console.log('default');
        break;
    }
  }

  public sort(value): void {
    const queryValue: string = value.target.value;
    switch (queryValue) {
      case 'Hybrid Theory':
        console.log('Hybrid Theory');
        this.crudServiceService
          .getCollectionItems<Product>('products', queryValue)
          .subscribe((products: Product[]) => {
            this.pageNumber = 1;
            this.productsList = products.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
          });
        break;
      case 'Hybrid Theory Annivercery':
        console.log('Hybrid Theory Annivercery');
        this.crudServiceService
          .getCollectionItems<Product>('products', queryValue)
          .subscribe((products: Product[]) => {
            this.pageNumber = 1;
            this.productsList = products.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
          });
        break;
      case 'Meteora':
        console.log('Meteora');
        this.crudServiceService
          .getCollectionItems<Product>('products', queryValue)
          .subscribe((products: Product[]) => {
            this.pageNumber = 1;
            this.productsList = products.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
          });
        break;
      case 'Minutes to Midnight':
        console.log('Minutes to Midnight');
        this.crudServiceService
          .getCollectionItems<Product>('products', queryValue)
          .subscribe((products: Product[]) => {
            this.pageNumber = 1;
            this.productsList = products.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
          });
        break;
      case 'One More Light':
        console.log('One More Light');
        this.crudServiceService
          .getCollectionItems<Product>('products', queryValue)
          .subscribe((products: Product[]) => {
            this.pageNumber = 1;
            this.productsList = products.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
          });
        break;
      default:
        console.log('default');
        break;
    }
  }

  public pageChange(number): void {
    this.pageNumber += number;
    this.getProducts();
  }

  public getProducts(): void {
    this.crudServiceService
      .getFilterProducts<Product>('products', 'title', 'asc', 100, 1)
      .subscribe((value: Product[]) => {
        console.log(value);
        this.productsList = value.slice(8 * this.pageNumber - 8, 8 * this.pageNumber);
        console.log(this.productsList);
      });
  }
}
