import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import firebase from 'firebase';
import { CRUDServiceService } from '../../Services/crudservice.service';
import { StoreService } from '../../Services/store.service';
import { Product } from '../../Interfaces/Product';
import User = firebase.User;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public ordersList: Product[] = [];

  public loading = true;

  constructor(
    private router: Router,
    private crudServiceService: CRUDServiceService,
    private storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.storeService.user$
      .pipe(
        switchMap((value: User) => {
          return this.crudServiceService
            .getQueryData('orders', {
              fieldPath: 'userID',
              value: value.uid,
            })
            .pipe(
              switchMap((value1: Product[]) => {
                this.ordersList = value1;
                this.loading = false;
                return [];

              }),
            );
        }),
      )
      .subscribe();
  }

  public checkInfo(event) {
    event.preventDefault();
  }
}
