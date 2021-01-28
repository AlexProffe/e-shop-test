import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ViewOrderComponent } from './view-order.component';

@NgModule({
  declarations: [ViewOrderComponent],
  imports: [CommonModule, SimpleNotificationsModule.forRoot()],
})
export class ViewOrderModule {}
