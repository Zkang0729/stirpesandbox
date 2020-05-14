import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { loadStripe, StripeCardElement } from '@stripe/stripe-js';
import { PaymentMethodService } from '../../services/payment-method.service';
import { CustomerService } from 'src/app/services/customer.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.css'],
})
export class CardInputComponent implements AfterViewInit {
  @Input() customerId: string;
  @Output() setPaymentMethodId: EventEmitter<string> = new EventEmitter();

  constructor(
    private paymentMethodService: PaymentMethodService,
    private customerService: CustomerService
  ) {}

  async ngAfterViewInit() {
    // Create a Stripe client.
    const stripe = await loadStripe(
      'pk_test_MwFKimgEIcq4asVFaSZmo0we00vLklyTQC'
    );

    // Create an instance of Elements.
    const elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };

    // Create an instance of the card Element.
    const card: StripeCardElement = elements.create('card', { style });

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.on('change', (event) => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Handle form submission.
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      stripe.createToken(card).then((result) => {
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
          this.paymentMethodService
            .addPaymentMethodThroughToken(paymentMethodCreateOptions)
            .pipe(
              flatMap((paymentMethod: string) => {
                const paymentMethodAttachOptions = {
                  customer: this.customerId,
                };
                return this.paymentMethodService.attachPaymentMethodToCustomer(
                  paymentMethod,
                  paymentMethodAttachOptions
                );
              }),
              flatMap((paymentMethodId: string) => {
                this.setPaymentMethodId.emit(paymentMethodId);
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
            .subscribe();
        }
      });
    });
  }

  // // Submit the form with the token ID.
  // public stripeTokenHandler = (token): void => {
  //   // Insert the token ID into the form so it gets submitted to the server
  //   const submitForm: HTMLFormElement = document.getElementById(
  //     'payment-form'
  //   ) as HTMLFormElement;
  //   const hiddenInput = document.createElement('input');
  //   hiddenInput.setAttribute('type', 'hidden');
  //   hiddenInput.setAttribute('name', 'stripeToken');
  //   hiddenInput.setAttribute('value', token.id);
  //   submitForm.appendChild(hiddenInput);

  //   // Submit the form
  //   submitForm.submit();
  // };
}
