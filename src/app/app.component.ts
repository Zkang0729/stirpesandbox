import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public customerId: string;
  public paymentMethodId: string;

  public setCustomerId(customerId: string): void {
    this.customerId = customerId;
  }

  public setPaymentMethodId(paymentMethodId: string): void {
    this.paymentMethodId = paymentMethodId;
  }
}
