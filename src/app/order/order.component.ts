import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Product } from '../Product';
import { StoreService } from '../store.service';
import { CRUDServiceService } from '../crudservice.service';
import { Shop } from '../Shop';
import { User } from '../User';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderForm = new FormGroup({
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/[А-я]/),
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/[А-я]/),
    ]),
    house: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    corps: new FormControl('', [Validators.min(1), Validators.max(36)]),
    entrance: new FormControl('', [Validators.min(1), Validators.max(36)]),
    floor: new FormControl('', [Validators.required, Validators.min(1), Validators.max(200)]),
    flat: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    message: new FormControl('', [Validators.maxLength(2048)]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/[А-я]/),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/[А-я]/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('\\+[0-9]{3} {0,1}[0-9]{2} {0,1}[0-9]{3} {0,1}[0-9]{2} {0,1}[0-9]{2}'),
    ]),
  });

  public cartItems: Product[] = [
    {
      count: 22222,
      title: 'Product title №12',
      description: 'Some words about this Product',
      image:
        'https://firebasestorage.googleapis.com/v0/b/e-shop-courses.appspot.com/o/portfolio-1.png?alt=media&token=2a414ab7-0979-4c0b-8534-db524b92d83f',
      price: 110,
      sale: 80,
      id: 'rLl2NpqGOV2WBUTLUcBc',
    },
  ];

  public transfer = 0;

  public user: User;

  public total: number =
    this.cartItems.reduce((acc, item) => {
      if (item.sale !== undefined) {
        return (acc += item.sale);
      }
      return (acc += item.price);
    }, 0) + this.transfer;

  public onSubmit(): void {
    const { controls } = this.orderForm;
    if (this.orderForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    const data = {
      city: controls.city.value,
      street: controls.street.value,
      house: controls.house.value,
      corps: controls.house?.value,
      entrance: controls.entrance?.value,
      floor: controls.floor.value,
      flat: controls.flat.value,
      message: controls.message?.value,
      name: controls.name.value,
      surname: controls.surname.value,
      email: controls.email.value,
      phone: controls.email.value,
      date: new Date().toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      products: this.cartItems,
    };
    if (this.user.balance > this.total) {
      this.crudServiceService
        .getQueryData('users', { fieldPath: 'uid', value: this.store.user.uid })
        .pipe(
          switchMap((value: User[]) => {
            if (value) {
              return this.crudServiceService
                .createEntity('orders', { ...data, userID: this.store.user.uid })
                .pipe(
                  tap((value2) => {
                    const [userInfo] = value;
                    let finalBalance = +userInfo.balance;
                    finalBalance -= +this.total;
                    this.notification.success('Успех', 'Товар успешно оплачен', {
                      timeOut: 2500,
                      showProgressBar: true,
                      pauseOnHover: true,
                      clickToClose: true,
                    });
                    this.crudServiceService.updateCartObject('shops', this.store.shop.id, 'bought');
                    this.store.shop = null;
                    this.crudServiceService.beforeLogout.next();
                    this.crudServiceService.beforeLogout.complete();
                    this.cartItems = [];
                    this.total = 0;
                    this.crudServiceService.updateUserBalance(
                      'users',
                      this.store.user.uid,
                      finalBalance,
                    );
                  }),
                );
            }
            return [];
          }),
          take(1),
        )
        .subscribe();
    } else {
      this.notification.error('Ошибка', 'Что-то пошло не так', {
        timeOut: 2500,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.orderForm.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private crudServiceService: CRUDServiceService,
    private router: Router,
    private notification: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.store.user$.subscribe((value) => {
      this.crudServiceService
        .getQueryMultipleData('shops', {
          firstFieldPath: 'userID',
          firstValue: value.uid,
          secondValue: 'active',
          secondFieldPath: 'status',
        })
        .subscribe((value1: Shop[]) => {
          this.cartItems = value1[0].cart;
          this.total =
            this.cartItems.reduce((acc, item) => {
              if (item.sale !== undefined) {
                return (acc += item.sale);
              }
              return (acc += item.price);
            }, 0) + this.transfer;

          this.crudServiceService
            .getQueryData('users', { fieldPath: 'uid', value: value.uid })
            .subscribe((value2) => {
              [this.user] = value2;
            });
        });
    });
  }
}
