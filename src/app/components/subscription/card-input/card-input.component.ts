import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { loadStripe, StripeCardElement, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.css'],
})
export class CardInputComponent implements AfterViewInit {
  @Input() stripe: Stripe;
  @Input() card: StripeCardElement;

  @Input() cardholderName: string = null;
  @Input() addressLine1: string = null;
  @Input() addressLine2: string = null;
  @Input() city: string = null;
  @Input() state: string = null;
  @Input() zip: string = null;
  @Input() country: string = null;
  @Input() email: string = null;
  @Input() phone: string = null;

  @Output() stripeChange: EventEmitter<Stripe> = new EventEmitter();
  @Output() cardChange: EventEmitter<StripeCardElement> = new EventEmitter();

  @Output() cardholderNameChange: EventEmitter<string> = new EventEmitter();
  @Output() addressLine1Change: EventEmitter<string> = new EventEmitter();
  @Output() addressLine2Change: EventEmitter<string> = new EventEmitter();
  @Output() cityChange: EventEmitter<string> = new EventEmitter();
  @Output() stateChange: EventEmitter<string> = new EventEmitter();
  @Output() zipChange: EventEmitter<string> = new EventEmitter();
  @Output() countryChange: EventEmitter<string> = new EventEmitter();
  @Output() emailChange: EventEmitter<string> = new EventEmitter();
  @Output() phoneChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  async ngAfterViewInit() {
    // Create a Stripe client.
    this.stripe = await loadStripe(
      'pk_test_MwFKimgEIcq4asVFaSZmo0we00vLklyTQC'
    );

    this.stripeChange.emit(this.stripe);

    // Create an instance of Elements.
    const elements = this.stripe.elements();

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
    this.card = elements.create('card', { style });

    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    this.card.on('change', (event) => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    this.cardChange.emit(this.card);
  }

  public setCardholderName(cardholderName: any): void {
    this.cardholderNameChange.emit(cardholderName);
  }

  public setAddressLine1(addressLine1: any): void {
    this.addressLine1Change.emit(addressLine1);
  }

  public setAddressLine2(addressLine2: any): void {
    this.addressLine2Change.emit(addressLine2);
  }

  public setCity(city: any): void {
    this.cityChange.emit(city);
  }

  public setState(state: any): void {
    this.stateChange.emit(state);
  }

  public setZip(zip: any): void {
    this.zipChange.emit(zip);
  }

  public setCountry(country: any): void {
    this.countryChange.emit(country);
  }

  public setPhone(phone: any): void {
    this.phoneChange.emit(phone);
  }
}
