import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase';
import { Shop } from './Shop';
import { Wishlist } from './Wishlist';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public user$: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  public shop$: BehaviorSubject<Shop> = new BehaviorSubject<Shop>(null);

  public wishlist$: BehaviorSubject<Wishlist> = new BehaviorSubject<Wishlist>(null);

  public comparisonList$: BehaviorSubject<Wishlist> = new BehaviorSubject<Wishlist>(null);

  private _user: firebase.User;

  private _shop: Shop;

  private _wishlist: Wishlist;

  private _comparisonList: Wishlist;

  get wishlist(): Wishlist {
    return this._wishlist;
  }

  set wishlist(value: Wishlist) {
    if (this._wishlist !== value) {
      this._wishlist = value;
      this.wishlist$.next(value);
    }
  }

  get comparisonList(): Wishlist {
    return this._comparisonList;
  }

  set comparisonList(value: Wishlist) {
    if (this._comparisonList !== value) {
      this._comparisonList = value;
      this.comparisonList$.next(value);
    }
  }

  get shop(): Shop {
    return this._shop;
  }

  set shop(value: Shop) {
    if (this._shop !== value) {
      this._shop = value;
      this.shop$.next(value);
    }
  }

  public get user(): firebase.User {
    return this._user;
  }

  public set user(user: firebase.User) {
    if (this._user !== user) {
      this._user = user;
      this.user$.next(user);
    }
  }

  constructor() {}
}
