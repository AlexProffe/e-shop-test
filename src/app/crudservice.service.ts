import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase';
import { Query } from './Query';
import { Shop } from './Shop';
import firestore = firebase.firestore;
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root',
})
export class CRUDServiceService {
  constructor(private firestoreService: AngularFirestore) {}

  public beforeLogout: Subject<void> = new Subject<void>();

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

  public getFilteredPriceProducts<T>(
    collectionName: string,
    { fieldPath = 'price', minValue = 35, maxValue = 110, limit = 6 },
  ): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.where(fieldPath, '>=', minValue).where(fieldPath, '<=', maxValue).limit(limit);
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

  public getFilterProducts<T>(
    collectionName: string,
    queryTitle: string,
    queryDirection: OrderByDirection,
    limit: number,
  ): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.orderBy(`${queryTitle}`, queryDirection).limit(limit);
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

  public getOrderData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.orderBy('options.order');
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
        take(1),
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const { id } = a.payload.doc;
            return { id, ...data } as T;
          }),
        ),
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

  public updateUserBalance(collectionName: string, id: string, value): Observable<void> {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .set({ balance: value }, { merge: true }),
    ).pipe(take(1));
  }

  public updateCartObject(collectionName: string, id: string, value: string): Observable<void> {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .set({ status: value }, { merge: true }),
    ).pipe(take(1));
  }

  public updateCart(collectionName: string, id: string, value: any): Observable<string> {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .set({ cart: value }, { merge: true }),
    ).pipe(
      map(() => id),
      take(1),
    );
  }

  public updateWishlist(collectionName: string, id: string, value: any): Observable<string> {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .set({ items: value }, { merge: true }),
    ).pipe(
      map(() => id),
      take(1),
    );
  }

  public handleShop(collectionName: string, shopId: string): Observable<any> {
    return this.firestoreService
      .collection(collectionName)
      .doc(shopId)
      .snapshotChanges()
      .pipe(
        map((testData: any) => {
          const data = testData.payload.data();
          const { id } = testData.payload;
          return { id, ...data };
        }),
      );
  }

  public handleWishlist(collectionName: string, wishId: string): Observable<any> {
    return this.firestoreService
      .collection(collectionName)
      .doc(wishId)
      .snapshotChanges()
      .pipe(
        map((testData: any) => {
          const data = testData.payload.data();
          const { id } = testData.payload;
          return { id, ...data };
        }),
      );
  }

  public deleteObject(collectionName: string, id: string): Observable<void> {
    return from(this.firestoreService.collection(collectionName).doc(id).delete()).pipe(take(1));
  }
}
