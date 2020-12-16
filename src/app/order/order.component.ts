import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Product';
import { StoreService } from '../store.service';
import { CRUDServiceService } from '../crudservice.service';
import { Shop } from '../Shop';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderForm = new FormGroup({
    city: new FormControl('', [Validators.required, Validators.minLength(5)]),
    street: new FormControl('', [Validators.required, Validators.minLength(5)]),
    house: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    corps: new FormControl('', [Validators.min(1), Validators.max(999)]),
    entrance: new FormControl('', [Validators.min(1), Validators.max(999)]),
    floor: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    flat: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    message: new FormControl('', [Validators.maxLength(2048)]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/[А-я]/),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/[А-я]/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/[А-я]/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/[А-я]/),
    ]),
    cardnumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(20),
    ]),
    cvv: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cardmonth: new FormControl('', [Validators.required, Validators.minLength(2)]),
    cardyear: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
    console.log(controls);
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
        });
    });
  }
}
