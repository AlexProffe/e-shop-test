import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { SharedModuleModule } from '../shared-module.module';
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [{ path: '', component: OrderComponent }];

@NgModule({
  declarations: [OrderComponent],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class OrderModule {}
