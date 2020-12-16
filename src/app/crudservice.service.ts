import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase';
import { Query } from './Query';
import firestore = firebase.firestore;
import DocumentReference = firebase.firestore.DocumentReference;
@Injectable({
  providedIn: 'root',
})
export class CRUDServiceService {
  constructor(private firestoreService: AngularFirestore) {}

  public createEntity(collectionName: string, data: {}): Observable<string> {
    return from(this.firestoreService.collection(collectionName).add(data)).pipe(
      map((value: DocumentReference) => value.id),
      take(1),
    );
  }

  public getData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const { id } = a.payload.doc;
            return { id, ...data } as T;
          }),
        ),
      );
  }

  public getQueryData<T>(collectionName: string, { fieldPath, value }): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.where(fieldPath, '==', value);
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const { id } = a.payload.doc;
            return { id, ...data } as T;
          }),
        ),
        take(1),
      );
  }

  public getQueryMultipleData<T>(
    collectionName: string,
    { firstFieldPath, firstValue, secondFieldPath, secondValue },
  ): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query
          .where(firstFieldPath, '==', firstValue)
          .where(secondFieldPath, '==', secondValue);
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const { id } = a.payload.doc;
            return { id, ...data } as T;
          }),
        ),
        take(1),
      );
  }

  public updateObject(collectionName: string, id: string, value): Observable<void> {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .set({ field: value }, { merge: true }),
    ).pipe(take(1));
  }

  public updateCartObject(collectionName: string, id: string, { value }): Observable<void> {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .set({ status: value }, { merge: true }),
    ).pipe(take(1));
  }

  public updateCart(collectionName: string, id: string, { value }): Observable<void> {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .set({ cart: value }, { merge: true }),
    ).pipe(take(1));
  }

  public deleteObject(collectionName: string, id: string): Observable<void> {
    return from(this.firestoreService.collection(collectionName).doc(id).delete()).pipe(take(1));
  }
}
