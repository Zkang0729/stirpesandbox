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

  public cardholderName: string = null;
  public addressLine1: string = null;
  public addressLine2: string = null;
  public city: string = null;
  public state: string = null;
  public zip: string = null;
  public country: string = null;
  public phone: string = null;

  constructor() {}

  ngOnInit(): void {}
}
