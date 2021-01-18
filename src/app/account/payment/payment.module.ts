import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { PaymentComponent } from './payment.component';

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, ReactiveFormsModule, TextMaskModule, SimpleNotificationsModule.forRoot()],
})
export class PaymentModule {}
