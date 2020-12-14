import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import firebase from "firebase";

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public user$: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  private _user: firebase.User;

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
