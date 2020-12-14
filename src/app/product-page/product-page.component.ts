import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDServiceService } from '../crudservice.service';
import { Product } from '../Product';
import { Query } from '../Query';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  constructor(
    private crudServiceService: CRUDServiceService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    this.activeRoute.params.subscribe((value) => {
      this.id = value.id;
    });
  }

  public id: string;

  public loading = true;

  public product: Product;

  ngOnInit(): void {
    this.getProducts();
    this.cdr.detectChanges();
  }

  public getProducts(): void {
    this.crudServiceService.getData<Product>('products').subscribe((value: Product[]) => {
      this.product = value.find((item) => item.id === this.id);
      this.loading = false;
    });
  }

  public addToCart(): void {
    console.log(this.product.id);
  }
}
