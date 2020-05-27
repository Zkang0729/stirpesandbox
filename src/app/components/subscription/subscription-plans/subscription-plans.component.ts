import { Component, OnInit, Input } from '@angular/core';
import { PlanService } from '../../../services/plan.service';
import { StripeCardElement, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css'],
})
export class SubscriptionPlansComponent implements OnInit {
  @Input() firstName: string = null;
  @Input() lastName: string = null;

  @Input() stripe: Stripe = null;
  @Input() card: StripeCardElement = null;

  @Input() cardholderName: string = null;
  @Input() addressLine1: string = null;
  @Input() addressLine2: string = null;
  @Input() city: string = null;
  @Input() state: string = null;
  @Input() zip: string = null;
  @Input() country: string = null;
  @Input() email: string = null;
  @Input() phone: string = null;
  public plans: any[] = null;

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.planService.getPlans().subscribe((plans) => (this.plans = plans));
  }
}
