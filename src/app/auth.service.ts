import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { from, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CRUDServiceService } from './crudservice.service';
import auth = firebase.auth;
import UserCredential = firebase.auth.UserCredential;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<any>;

  constructor(
    private angAuthService: AngularFireAuth,
    private crudServiceService: CRUDServiceService,
    private firestoreService: AngularFirestore,
  ) {
    this.user$ = this.angAuthService.authState.pipe(
      switchMap((user: firebase.User) => {
        if (user) {
          return this.firestoreService.doc(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      }),
    );
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
    return from(this.angAuthService.signOut());
  }

  private updateUserData(user) {
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
