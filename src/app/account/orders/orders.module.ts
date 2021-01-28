import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { SharedModuleModule } from '../../shared-module.module';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, SharedModuleModule],
})
export class OrdersModule {}
