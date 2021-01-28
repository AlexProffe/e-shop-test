import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';
import { StoreService } from '../Services/store.service';
import { CRUDServiceService } from '../Services/crudservice.service';
import { Shop } from '../Interfaces/Shop';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: firebase.User;

  constructor(
    public authService: AuthService,
    private router: Router,
    public storeService: StoreService,
    private crudServiceService: CRUDServiceService,
  ) {}

  ngOnInit(): void {}

  public login(): void {
    this.authService.googleAuth().subscribe((value) => {
      console.log(value);
    });

    this.crudServiceService
      .getQueryMultipleData('shops', {
        firstFieldPath: 'userID',
        firstValue: this.storeService.user,
        secondFieldPath: 'status',
        secondValue: 'saved',
      })
      .pipe(
        switchMap((value: Shop[]) => {
          const shopCart: Shop = value[0];
          console.log(shopCart);
          if (!shopCart) {
            return this.crudServiceService.createEntity('shops', {
              cart: [],
              userID: this.storeService.user.uid,
              status: 'active',
            });
          }
          return this.crudServiceService.updateCartObject('shops', shopCart.id, 'active');
        }),
      )
      .subscribe();
    this.router.navigate(['/']);
  }
}
