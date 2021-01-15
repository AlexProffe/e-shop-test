import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { luhnValidator } from './validators/luhnValidator';
import { getValidationConfigFromCardNo } from './helpers/card.helper';
import { CRUDServiceService } from '../../crudservice.service';
import { StoreService } from '../../store.service';
import { User } from '../../User';
import {Router} from "@angular/router";
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  cardNumberGroup: FormGroup;

  constructor(private crudServiceService: CRUDServiceService, private storeService: StoreService, private router: Router) {}

  ngOnInit() {
    this.cardNumberGroup = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        luhnValidator(),
      ]),
      cvv: new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
        Validators.min(100),
        Validators.max(999),
      ]),
      date: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-1]{1}[0-9]{1}[/]{0,1}[0-9]{2}$'),
      ]),
      value: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    });
  }

  public getCardNumberControl(): AbstractControl | null {
    return this.cardNumberGroup && this.cardNumberGroup.get('cardNumber');
  }

  public sumbitForm(): void {

    const { controls } = this.cardNumberGroup;
    console.log(this.cardNumberGroup)
    if (this.cardNumberGroup.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    const data = {
      balance: controls.value.value,
    };

    this.crudServiceService
      .getQueryData('users', { fieldPath: 'uid', value: this.storeService.user.uid })
      .pipe(
        switchMap((value1: User[]) => {
          console.log(value1);
          if (value1) {
            const [userInfo] = value1;
            let finalBalance = +userInfo.balance;
            finalBalance += +data.balance;
            console.log(finalBalance);
            setTimeout(() => {
              alert('Счёт успешно пополнен');
              this.router.navigate(['/account/info']);
            }, 0);
            return this.crudServiceService.updateUserBalance(
              'users',
              this.storeService.user.uid,
              finalBalance,
            );
          }
          return [];
        }),
      )
      .subscribe();
  }

  public cardMaskFunction(rawValue: string): Array<RegExp> {
    const card = getValidationConfigFromCardNo(rawValue);
    if (card) {
      return card.mask;
    }
    return [/\d/];
  }
}
