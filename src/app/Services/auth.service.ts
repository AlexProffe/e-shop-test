import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { from, Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CRUDServiceService } from './crudservice.service';
import { StoreService } from './store.service';
import auth = firebase.auth;
import UserCredential = firebase.auth.UserCredential;
import User = firebase.User;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<firebase.User>;

  constructor(
    private angAuthService: AngularFireAuth,
    private crudServiceService: CRUDServiceService,
    private firestoreService: AngularFirestore,
    private storeService: StoreService,
  ) {
    this.angAuthService.authState
      .pipe(
        tap((user: firebase.User) => {
          this.storeService.user = user;
        }),
        switchMap((user: firebase.User) => {
          if (user) {
            return this.firestoreService.doc(`users/${user.uid}`).valueChanges();
          }
          return of(null);
        }),
      )
      .subscribe();
  }

  public googleAuth(): Observable<UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.angAuthService.signInWithPopup(provider)).pipe(
      tap((userCred: auth.UserCredential) => {
        this.updateUserData(userCred.user);
      }),
    );
  }

  public signOut() {
    return from(this.angAuthService.signOut()).pipe(take(1));
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestoreService.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(data, { merge: true });
  }
}
