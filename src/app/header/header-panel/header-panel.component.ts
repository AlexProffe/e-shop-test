import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { AuthService } from '../../auth.service';
import { StoreService } from '../../store.service';

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
  ) {}

  public wishlistCount = 3;

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
    this.authService.googleAuth().subscribe((value) => console.log(value));
    this.router.navigate(['/']);
  }

  public logout($event): void {
    $event.preventDefault();
    this.authService.signOut().subscribe((value) => console.log(value));
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
