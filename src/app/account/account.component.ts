import { Component, OnInit } from '@angular/core';
import { SidebarItem } from '../Interfaces/SidebarItem';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public sidebarLinks: SidebarItem[] = [
    {
      title: 'Info',
      link: 'info',
      iconClass: 'fa fa-home',
    },
    {
      title: 'Wishlist',
      link: 'wishlist',
      iconClass: 'fa fa-heart',
    },
    {
      title: 'Orders',
      link: 'orders',
      iconClass: 'fa fa-first-order',
    },
    {
      title: 'Payment',
      link: 'payment',
      iconClass: 'fa fa-credit-card',
    },
    {
      title: 'Exit',
      iconClass: 'fa fa-sign-out',
    },
  ];

  ngOnInit(): void {}
}
