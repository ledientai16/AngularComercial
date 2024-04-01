import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { MyShopFormService } from '../../services/my-shop-form.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];
  constructor(private formBuilder: FormBuilder,
    private myShopService: MyShopFormService
  ) { }

  ngOnInit(): void {
    //get list credit month and year
    let currentMonth = new Date().getMonth() + 1;
    this.myShopService.getCreditCardMonths(currentMonth).subscribe(
      data => {
        this.creditCardMonths = data
      }
    );

    this.myShopService.getCreditCardYear().subscribe(
      data => {
        this.creditCardYears = data
      }
    );
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    })
  }
  onSubmit() {
    console.log("handling a submit button");
    console.log(this.checkoutFormGroup?.get('customer')?.value);
  }
  copyShippingAddressToBillingAddress(event: Event) {
    const ischecked = (<HTMLInputElement>event.target).checked
    if (ischecked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }
  handleChangeYear() {
    const creditCardForm = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardForm?.value.expirationYear);

    let startMonth = (currentYear == selectedYear) ? new Date().getMonth() + 1 : 1;

    this.myShopService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data
      }
    )
  }
}
