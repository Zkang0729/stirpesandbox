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
  @Input() email: string = null;

  @Input() stripe: Stripe = null;
  @Input() card: StripeCardElement = null;

  public plans: any[] = null;

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.planService.getPlans().subscribe((plans) => (this.plans = plans));
  }
}
