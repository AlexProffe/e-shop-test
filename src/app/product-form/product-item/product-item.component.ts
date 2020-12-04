import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { CRUDServiceService } from '../../crudservice.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input()
  public product: Product;

  constructor(private crudServiceService: CRUDServiceService) {}

  ngOnInit(): void {
    console.log(this.product);
  }

  public delete(id: string): void {
    this.crudServiceService.deleteObject('products', id).subscribe();
  }
}
