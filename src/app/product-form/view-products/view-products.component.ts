import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { CRUDServiceService } from '../../Services/crudservice.service';
import { Product } from '../../Interfaces/Product';
import { Book } from '../../Interfaces/Book';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
})
export class ViewProductsComponent {
  @Input() productsList: Product[];


  constructor(private crudServiceService: CRUDServiceService) {}
}
