import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Icon } from '../../Interfaces/Icon';
import { Link } from '../../Interfaces/Link';
import { AuthService } from '../../Services/auth.service';
import { StoreService } from '../../Services/store.service';
import { CRUDServiceService } from '../../Services/crudservice.service';
import { Shop } from '../../Interfaces/Shop';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss'],
})
export class HeaderPanelComponent implements OnInit, OnDestroy {
  constructor(
    public authService: AuthService,
    private router: Router,
    public storeService: StoreService,
    private crudServiceService: CRUDServiceService,
  ) {}

  public wishlistCount = 3;

  public cartId: any;

  public user: firebase.User;

  public loginIcon: Icon = {
    class: 'fa fa-sign-in',
  };

  public loginLink: Link = {
    url: '#',
    title: 'Sign in',
    target: '_self',
    class: 'account__login link--hover--big',
  };

  public logoutLink: Link = {
    url: '/home',
    title: 'Sign up',
    target: '_self',
    class: 'account__login link--hover--big',
  };

  public wishlistIcon: Icon = {
    class: 'fa fa-heart',
  };

  public wishlistLink: Link = {
    url: '#',
    title: 'Wishlist',
    target: '_self',
    class: '',
  };

  public login($event): void {
    $event.preventDefault();
    this.authService.googleAuth().subscribe((value) => {});
    this.router.navigate(['/']);
  }

  public logout($event): void {
    this.storeService.shop = null;
    this.crudServiceService.beforeLogout.next();
    this.crudServiceService.beforeLogout.complete();
    $event.preventDefault();
    this.storeService.user$.subscribe((value1: firebase.User) => {
      this.user = value1;
    });
    this.crudServiceService
      .getQueryMultipleData('shops', {
        firstFieldPath: 'userID',
        firstValue: this.user.uid,
        secondFieldPath: 'status',
        secondValue: 'active',
      })
      .subscribe((value: Shop[]) => {
        this.cartId = value[0].id;

        this.crudServiceService
          .updateCartObject('shops', this.cartId, 'saved')
          .subscribe((value1) => {});
      });
    this.authService.signOut().subscribe((value) => {});
    this.router.navigate(['/']);
  }

  public open($event) {
    $event.preventDefault();
  }

  ngOnInit(): void {
    this.storeService.user$
      .pipe(
        filter((value) => !!value),
        switchMap((value) => {
          return this.crudServiceService
            .getQueryMultipleData('shops', {
              firstFieldPath: 'userID',
              firstValue: value.uid,
              secondFieldPath: 'status',
              secondValue: 'saved',
            })
            .pipe(
              switchMap((shopValue: Shop[]) => {
                const shopCart: Shop = shopValue[0];
                if (!shopCart) {
                  return this.crudServiceService
                    .getQueryMultipleData('shops', {
                      firstFieldPath: 'userID',
                      firstValue: value.uid,
                      secondFieldPath: 'status',
                      secondValue: 'active',
                    })
                    .pipe(
                      switchMap((shopValue1: Shop[]) => {
                        const shopCart1: Shop = shopValue1[0];
                        if (!shopCart1) {
                          return this.crudServiceService.createEntity('shops', {
                            cart: [],
                            userID: value.uid,
                            status: 'active',
                          });
                        }
                        this.storeService.shop = shopCart1;
                        return this.crudServiceService.updateCartObject(
                          'shops',
                          shopCart1.id,
                          'active',
                        );
                      }),
                    );
                }
                this.storeService.shop = shopCart;

                return this.crudServiceService.updateCartObject('shops', shopCart.id, 'active');
              }),
            );
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.crudServiceService
      .getQueryMultipleData('shops', {
        firstFieldPath: 'userID',
        firstValue: this.storeService.user.uid,
        secondFieldPath: 'status',
        secondValue: 'active',
      })
      .pipe(
        switchMap((shopValue: Shop[]) => {
          const shopCart: Shop = shopValue[0];

          console.log(shopCart);
          if (!shopCart) {
            console.log(shopCart);
            return;
          }
          return this.crudServiceService.updateCartObject('shops', shopCart.id, 'saved');
        }),
      );
  }
}
