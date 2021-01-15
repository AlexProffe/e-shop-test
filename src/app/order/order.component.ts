import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, take, tap } from 'rxjs/operators';
import { Product } from '../Product';
import { StoreService } from '../store.service';
import { CRUDServiceService } from '../crudservice.service';
import { Shop } from '../Shop';
import { User } from '../User';
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderForm = new FormGroup({
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/[А-я]/),
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
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
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
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
                    alert('Заказ успешно оплачен, спасибо за покупку');
                    this.router.navigate(['/']);
                    return this.crudServiceService
                      .updateUserBalance('users', this.store.user.uid, finalBalance)
                      .pipe(
                        tap((value3) => {
                          console.log(value3)
                          return this.crudServiceService
                            .getQueryData('shops', { fieldPath: 'uid', value: this.store.user.uid })
                            .pipe(
                              switchMap((value1: Shop[]) => {
                                console.log(value1)
                                const [id] = value1;
                                return this.crudServiceService.updateCartObject(
                                  'shops',
                                  id.id,
                                  'bought',
                                );
                              }),
                            );
                        }),
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
      alert('Error');
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.orderForm.controls[controlName];
    if (controlName === 'phone') {
      console.log(control);
    }
    const result = control.invalid && control.touched;

    return result;
  }

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private crudServiceService: CRUDServiceService,
    private router: Router,
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
              this.user = value2[0];
              console.log(this.user);
            });
        });
    });
  }
}
