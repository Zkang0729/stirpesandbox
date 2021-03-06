import { Component, OnInit, Input } from '@angular/core';
import { SubscriptionService } from '../../../../services/subscription.service';
import { StripeCardElement, Stripe } from '@stripe/stripe-js';
import { CustomerService } from 'src/app/services/customer.service';
import { switchMap } from 'rxjs/operators';
import { PaymentMethodService } from 'src/app/services/payment-method.service';

@Component({
  selector: 'app-subscription-plan-item',
  templateUrl: './subscription-plan-item.component.html',
  styleUrls: ['./subscription-plan-item.component.css'],
})
export class SubscriptionPlanItemComponent implements OnInit {
  @Input() plan: any;

  @Input() firstName: string = null;
  @Input() lastName: string = null;
  @Input() email: string = null;

  @Input() stripe: Stripe = null;
  @Input() card: StripeCardElement = null;

  public customerId: string = null;
  public paymentMethodId: string = null;
  public quantity: number = null;

  constructor(
    private subscriptionService: SubscriptionService,
    private paymentMethodService: PaymentMethodService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {}

  public setQuantity(quantity: any): void {
    this.quantity = quantity.target.value;
  }

  public async addCustomer(): Promise<void> {
    const customerCreateOptions = {
      name: this.firstName + ' ' + this.lastName,
      email: this.email,
    };
    const customer = await this.customerService
      .addCustomer(customerCreateOptions)
      .toPromise();
    this.customerId = customer;
  }

  public async createPaymentMethod(): Promise<void> {
    const result = await this.stripe.createToken(this.card);

    if (result.error) {
      // Inform the user if there was an error.
      const errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      const paymentMethodCreateOptions = {
        type: 'card',
        card: { token: result.token.id },
      };
      await this.paymentMethodService
        .addPaymentMethodThroughToken(paymentMethodCreateOptions)
        .pipe(
          switchMap((paymentMethod: string) => {
            const paymentMethodAttachOptions = {
              customer: this.customerId,
            };
            return this.paymentMethodService.attachPaymentMethodToCustomer(
              paymentMethod,
              paymentMethodAttachOptions
            );
          }),
          switchMap((paymentMethodId: string) => {
            this.paymentMethodId = paymentMethodId;
            const customerUpdateOptions = {
              invoiceSettings: {
                defaultPaymentMethod: paymentMethodId,
              },
            };
            return this.customerService.updateCustomer(
              this.customerId,
              customerUpdateOptions
            );
          })
        )
        .toPromise();
    }
  }

  public createSubscription(): void {
    if (!this.quantity) {
      alert('Quantity must be greater than 0!');
      return;
    }
    const subscriptionCreateOptions = {
      customer: this.customerId,
      items: [
        {
          plan: this.plan.id,
          quantity: Number(this.quantity),
        },
      ],
      defaultPaymentMethod: this.paymentMethodId,
    };
    this.subscriptionService
      .addSubscription(subscriptionCreateOptions)
      .subscribe();
  }

  public async onSubmit(): Promise<void> {
    await this.addCustomer();
    await this.createPaymentMethod();
    this.createSubscription();
  }
}
