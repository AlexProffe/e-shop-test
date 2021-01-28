import { Component, OnInit } from '@angular/core';
import { Product } from '../Interfaces/Product';
import { CRUDServiceService } from '../Services/crudservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public productsList: Product[] = [];

  constructor(private crudServiceService: CRUDServiceService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.crudServiceService
      .getFilteredPriceProducts<Product>('products', {
        fieldPath: 'price',
        maxValue: undefined,
        minValue: undefined,
        limit: 6,
      })
      .subscribe((value: Product[]) => {
        this.productsList = value;
      });
  }
}
