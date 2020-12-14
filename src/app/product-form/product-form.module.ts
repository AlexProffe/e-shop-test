import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { SharedModuleModule } from '../shared-module.module';

const routes: Routes = [{ path: '/createproduct', component: ProductFormComponent }];

@NgModule({
  declarations: [
    ProductFormComponent,
    CreateProductComponent,
  ],
  imports: [CommonModule, SharedModuleModule, ReactiveFormsModule],
})
export class ProductFormModule {}
