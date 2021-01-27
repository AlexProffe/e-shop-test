import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { StoreService } from '../store.service';
import { CRUDServiceService } from '../crudservice.service';
import { Product } from '../Product';
import { Wishlist } from '../Wishlist';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss'],
})
export class ComparisonComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private crudServiceService: CRUDServiceService,
    private router: Router,
  ) {}

  Object = Object;

  public optionsNames: string[] = ['brand', 'color', 'material', 'model', 'size'];

  public comparisonList: Wishlist = {
    items: [],
  };

  public toProduct(value): void {
    this.router.navigate([`/product/${value}`]);
  }

  public removeItem(value): void {
    const index = this.comparisonList.items.findIndex((item) => item.id === value.id);
    const newWishlist = this.comparisonList.items.splice(index, 1);
    this.crudServiceService.updateWishlist(
      'comparisons',
      this.comparisonList.id,
      this.comparisonList.items,
    );
  }

  ngOnInit(): void {
    this.crudServiceService
      .getQueryData('comparisons', { fieldPath: 'uid', value: this.storeService.user.uid })
      .subscribe((value: Wishlist[]) => {
        [this.comparisonList] = value;
        this.comparisonList.items.forEach((item) => {
          item.options.sort((a: any, b: any) => a.order - b.order);
        });
      });
    this.crudServiceService.getOrderData('products').subscribe((value) => {
    });
  }
}
