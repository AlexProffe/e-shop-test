import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { CRUDServiceService } from '../../crudservice.service';
import { Product } from '../../Product';
import { Book } from '../../Book';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
})
export class ViewProductsComponent {
  @Input() productsList: Product[];


  constructor(private crudServiceService: CRUDServiceService) {}
}
