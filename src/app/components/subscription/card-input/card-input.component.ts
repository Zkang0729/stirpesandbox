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

  @Output() stripeChange: EventEmitter<Stripe> = new EventEmitter();
  @Output() cardChange: EventEmitter<StripeCardElement> = new EventEmitter();

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
}
