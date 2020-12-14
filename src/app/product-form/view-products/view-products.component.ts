import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { CRUDServiceService } from '../../crudservice.service';
import { Product } from '../../Product';
import { Book } from '../../Book';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
})
export class ViewProductsComponent implements OnInit {
  public productsList: Product[];

  constructor(private crudServiceService: CRUDServiceService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.crudServiceService.getData<Product>('products').subscribe((value: Product[]) => {
      this.productsList = value;
    });
  }

  public check(): void {
    this.crudServiceService.getData<Product>('products').subscribe((value: Product[]) => {});
  }
}
