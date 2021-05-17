import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take, tap } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { CRUDServiceService } from '../Services/crudservice.service';
import { Product } from '../Interfaces/Product';
import { Query } from '../Interfaces/Query';
import { Shop } from '../Interfaces/Shop';
import { StoreService } from '../Services/store.service';

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
    private store: StoreService,
    private notification: NotificationsService,
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.id = params.id;
      console.log(params);
    });
  }

  public id: string;

  public loading = true;

  public product: Product;

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.crudServiceService.getData<Product>('products').subscribe((value: Product[]) => {
      this.product = value.find((item) => item.id === this.id);
      this.loading = false;
    });
  }

  public CopyLink(): void {
    const loc = window.location.href;
    navigator.clipboard
      .writeText(loc)
      .then(() => {
        this.notification.success('Успех', 'Текст добавлен в буфер обмена', {
          timeOut: 2500,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        });
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  }

  public addToCart(): void {
    if (this.store.user) {
      this.crudServiceService
        .getQueryMultipleData('shops', {
          firstFieldPath: 'userID',
          firstValue: this.store.user.uid,
          secondFieldPath: 'status',
          secondValue: 'active',
        })
        .pipe(
          switchMap((value1: Shop[]) => {
            const shopCart: Shop = value1[0];
            if (!shopCart) {
              return this.crudServiceService.createEntity('shops', {
                cart: [this.product],
                userID: this.store.user.uid,
                status: 'active',
              });
            }
            shopCart.cart.push(this.product);
            this.notification.success('Успех', 'Товар успешно добавлен в корзину', {
              timeOut: 2500,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            return this.crudServiceService.updateCart('shops', shopCart.id, shopCart.cart);
          }),
          tap((value: string) => {
            this.store.shop = { id: value };
          }),
          take(1),
        )
        .subscribe();
    } else {
      this.notification.error('Ошибка', 'Сначала войдите в аккаунт', {
        timeOut: 2500,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
      this.router.navigate(['/login']);
    }
  }
}
