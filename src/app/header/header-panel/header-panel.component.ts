import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { AuthService } from '../../auth.service';
import { StoreService } from '../../store.service';
import { CRUDServiceService } from '../../crudservice.service';
import { Shop } from '../../Shop';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss'],
})
export class HeaderPanelComponent implements OnInit {
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
    this.authService.googleAuth().subscribe((value) => {
      console.log(value);
    });
    setTimeout(() => {
      this.storeService.user$.subscribe((value: firebase.User) => {
        this.user = value;
        this.crudServiceService
          .getQueryMultipleData('shops', {
            firstFieldPath: 'userID',
            firstValue: this.user.uid,
            secondFieldPath: 'status',
            secondValue: 'saved',
          })
          .subscribe((value1: Shop[]) => {
            this.cartId = value1[0].id;
            this.crudServiceService
              .updateCartObject('shops', this.cartId, { value: 'active' })
              .subscribe((value2) => console.log(value2));
          });
      });
    }, 3500);
    this.router.navigate(['/']);
  }

  public logout($event): void {
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
          .updateCartObject('shops', this.cartId, { value: 'saved' })
          .subscribe((value1) => console.log(value1));
      });
    this.authService.signOut().subscribe((value) => console.log(value));
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
