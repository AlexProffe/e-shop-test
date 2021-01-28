import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { CRUDServiceService } from '../../Services/crudservice.service';
import { Product } from '../../Interfaces/Product';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  public id: string;

  public order: Product;

  public loading = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private crudServiceService: CRUDServiceService,
    private notification: NotificationsService,
  ) {
    this.activeRoute.params.pipe(take(1)).subscribe((value) => {
      this.id = value.id;
    });
  }

  public CopyLink(id): void {
    const loc = window.location.href;
    navigator.clipboard
      .writeText(loc)
      .then(() => {
        this.notification.success('Успех', 'Текст добавлен в буфер обмена', {
          timeOut: 2500,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        });
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  }

  ngOnInit(): void {
    this.crudServiceService.getData<Product>('orders').subscribe((value: Product[]) => {
      this.order = value.find((item) => item.id === this.id);
      this.loading = false;
    });
  }
}
