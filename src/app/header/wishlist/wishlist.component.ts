import { Component, Input, OnInit } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { StoreService } from '../../store.service';
import { CRUDServiceService } from '../../crudservice.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  @Input()
  public icon: Icon;

  @Input()
  public link: Link;

  @Input()
  public count: number;

  constructor(private storeService: StoreService, private crudServiceService: CRUDServiceService) {}

  ngOnInit(): void {
    this.storeService.user$
      .pipe(
        switchMap((value) => {
          if (value) {
            return this.crudServiceService
              .getQueryData('wishlists', { fieldPath: 'uid', value: value.uid })
              .pipe(
                switchMap((value1) => {
                  if (value1.length) {
                    this.storeService.wishlist = value1[0];
                    return [];
                  }

                  return this.crudServiceService.createEntity('wishlists', {
                    uid: value.uid,
                    items: [],
                  });

                  const wishlist = [];
                  return wishlist;
                }),
              );
          }
          const value2 = [];
          return value2;
        }),
      )
      .subscribe();
  }
}
