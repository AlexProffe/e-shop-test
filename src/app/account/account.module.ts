import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../shared-module.module';
import { AccountComponent } from './account.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { InfoComponent } from './info/info.component';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import {ViewOrderComponent} from "./view-order/view-order.component";
import {AuthGuardService} from "../auth-guard.service";

const accountRoutes: Routes = [
  {
    path: 'wishlist',
    component: WishlistComponent,
    loadChildren: () => import('./wishlist/wishlist.module').then((m) => m.WishlistModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'info',
    component: InfoComponent,
    loadChildren: () => import('./info/info.module').then((m) => m.InfoModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    loadChildren: () => import('./payment/payment.module').then((m) => m.PaymentModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'view-order/:id',
    component: ViewOrderComponent,
    loadChildren: () => import('./view-order/view-order.module').then((m) => m.ViewOrderModule),
    canActivate: [AuthGuardService],
  },
];

const routes: Routes = [{ path: '', component: AccountComponent, children: accountRoutes }];

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountModule {}
