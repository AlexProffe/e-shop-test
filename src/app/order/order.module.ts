import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { OrderComponent } from './order.component';
import { SharedModuleModule } from '../shared-module.module';

const routes: Routes = [{ path: '', component: OrderComponent }];

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class OrderModule {}
