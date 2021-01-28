import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ProductPageComponent } from './product-page.component';
import { SharedModuleModule } from '../shared-module.module';

const routes: Routes = [{ path: '', component: ProductPageComponent }];

@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
    SimpleNotificationsModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class ProductPageModule {}
