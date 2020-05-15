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

  public cardholderName: string = null;
  public addressLine1: string = null;
  public addressLine2: string = null;
  public city: string = null;
  public state: string = null;
  public zip: string = null;
  public country: string = null;
  public email: string = null;
  public phone: string = null;

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

      const data = {
        name: this.cardholderName,
        address_line1: this.addressLine1,
        address_line2: this.addressLine2 || '',
        address_city: this.city,
        address_state: this.state,
        address_zip: this.zip,
        address_country: this.country,
      };
      console.log(data);
      stripe.createToken(card, data).then((result) => {
        if (result.error) {
          // Inform the user if there was an error.
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          const paymentMethodCreateOptions = {
            type: 'card',
            card: { token: result.token.id },
            billingDetails: {
              address: {
                city: this.city,
                country: this.country,
                line1: this.addressLine1,
                line2: this.addressLine2,
                postalCode: this.zip,
                state: this.state,
              },
              email: this.email,
              name: this.cardholderName,
              phone: this.phone,
            },
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

  public setCardholderName(cardholderName: any): void {
    this.cardholderName = cardholderName.target.value;
  }

  public setAddressLine1(addressLine1: any): void {
    this.addressLine1 = addressLine1.target.value;
  }

  public setAddressLine2(addressLine2: any): void {
    this.addressLine2 = addressLine2.target.value;
  }

  public setCity(city: any): void {
    this.city = city.target.value;
  }

  public setState(state: any): void {
    this.state = state.target.value;
  }

  public setZIP(zip: any): void {
    this.zip = zip.target.value;
  }

  public setCountry(country: any): void {
    this.country = country.target.value;
  }

  public setEmail(email: any): void {
    this.email = email.target.value;
  }

  public setPhone(phone: any): void {
    this.phone = phone.target.value;
  }
}
