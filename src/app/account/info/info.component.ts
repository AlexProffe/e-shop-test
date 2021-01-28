import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { switchMap, take, tap } from 'rxjs/operators';
import { StoreService } from '../../Services/store.service';
import { CRUDServiceService } from '../../Services/crudservice.service';

import User = firebase.User;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  constructor(private storeService: StoreService, private crudServiceService: CRUDServiceService) {}

  public user: any;

  public show = false;

  ngOnInit(): void {
    this.storeService.user$
      .pipe(
        switchMap((value: User) => {
          return this.crudServiceService.getQueryData('users', {
            fieldPath: 'uid',
            value: value.uid,
          });
        }),
      )
      .subscribe((value1) => {
        [this.user] = value1;
        if (this.user) {
          this.show = true;
        }
      });
  }
}
