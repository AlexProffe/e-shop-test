import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Product } from '../../Product';
import { CRUDServiceService } from '../../crudservice.service';
import { Image } from '../../Image';
import { StoreService } from '../../store.service';
import {Shop} from "../../Shop";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  constructor(
    private crudServiceService: CRUDServiceService,
    private router: Router,
    private store: StoreService,
  ) {}

  @Input()
  public product: Product;

  public cartProducts: any[] = [];

  public cart: Product[];

  public image: Image;

  public user: any;

  ngOnInit(): void {
    this.image = {
      url: this.product.image,
      alt: this.product.title,
    };
  }

  public addToCart(): void {
    this.crudServiceService
      .getQueryData<Product>('products', { fieldPath: 'title', value: this.product.title })
      .subscribe((value: Product[]) => {
        this.cartProducts.push(value[0].id);
        console.log(this.cartProducts);
      });
    this.store.user$.subscribe((value: firebase.User) => {
      this.user = value;
      if (this.user === null) {
        this.router.navigate(['/login']);
      } else {
        console.log('User UID : ', this.user.uid);
        this.crudServiceService
          .getQueryMultipleData('shops', {
            firstFieldPath: 'userID',
            firstValue: this.user.uid,
            secondFieldPath: 'status',
            secondValue: 'active',
          })
          .subscribe((value1) => {
            if (value1.length === 0) {
              console.log('13221');
              this.crudServiceService
                .createEntity('shops', {
                  cart: [],
                  userID: this.user.uid,
                  status: 'active',
                })
                .subscribe((value2) => console.log(value2));
            } else {
              this.crudServiceService
                .getQueryMultipleData('shops', {
                  firstFieldPath: 'userID',
                  firstValue: this.user.uid,
                  secondFieldPath: 'status',
                  secondValue: 'active',
                })
                .subscribe((value2: Shop[]) => {
                  this.cart = value2[0].cart;
                  this.cart.push(this.product);
                  console.log(value2[0].id);
                  this.crudServiceService
                    .updateCart('shops', value2[0].id, { value: this.cart })
                    .subscribe((value3) => console.log(value3));
                });
            }
          });
      }
    });
    console.log(this.product.id);
  }

  public toProduct(): void {
    this.router.navigate([`/product/${this.product.id}`]);
  }
}
