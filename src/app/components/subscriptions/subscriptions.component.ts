import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
})
export class SubscriptionsComponent implements OnInit {
  public subscriptions: any[] = null;
  public monthlyId: string = null;
  public yearlyId: string = null;

  constructor(
    private subscriptionSerivce: SubscriptionService,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    this.subscriptionSerivce
      .getSubscriptions()
      .subscribe((subscriptions) => (this.subscriptions = subscriptions));
    this.planService.getPlans().subscribe((plans) => {
      this.monthlyId = plans.filter(
        (plan) => plan.nickname === 'Monthly'
      )[0].id;
      this.yearlyId = plans.filter((plan) => plan.nickname === 'Yearly')[0].id;
    });
  }
}
