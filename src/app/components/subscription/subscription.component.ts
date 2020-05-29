import { Component, OnInit } from '@angular/core';
import { StripeCardElement, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  public stripe: Stripe;
  public card: StripeCardElement;

  public firstName: string = null;
  public lastName: string = null;
  public email: string = null;
  public password: string = null;

  constructor() {}

  ngOnInit(): void {}
}
