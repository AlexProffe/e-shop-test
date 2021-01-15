import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { PaymentComponent } from './payment.component';

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, ReactiveFormsModule, TextMaskModule, TextMaskModule],
})
export class PaymentModule {}
