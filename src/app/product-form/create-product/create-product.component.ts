import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CRUDServiceService } from '../../Services/crudservice.service';
import { Product } from '../../Interfaces/Product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  contactForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/[А-я]/),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(10)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/[А-я]/),
    ]),
    count: new FormControl('', [Validators.required, Validators.min(10)]),
  });

  public onSubmit(): void {
    const { controls } = this.contactForm;
    if (this.contactForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());

      return;
    }
    const product: Product = {
      title: controls.title.value.trim(),
      price: controls.price.value,
      description: controls.description.value.trim(),
      count: controls.count.value,
    };
    this.crudService
      .createEntity('products', product)
      .subscribe((value: string) => console.log(value));
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.contactForm.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  constructor(private fb: FormBuilder, private crudService: CRUDServiceService) {}

  ngOnInit(): void {}
}
