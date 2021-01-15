import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home-routing.module').then((m) => m.HomeRoutingModule),
  },
  {
    path: 'createproduct',
    loadChildren: () =>
      import('./product-form/product-form.module').then((m) => m.ProductFormModule),
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./product-page/product-page.module').then((m) => m.ProductPageModule),
  },
  {
    path: 'catalog',
    loadChildren: () => import('./catalog/catalog.module').then((m) => m.CatalogModule),
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then((m) => m.OrderModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  declarations: [],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppRoutingModule {}
