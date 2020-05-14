import { Component, OnInit, Input } from '@angular/core';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css'],
})
export class SubscriptionPlansComponent implements OnInit {
  @Input() customerId: string;
  @Input() paymentMethodId: string;
  public plans: any[] = null;

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.planService.getPlans().subscribe((plans) => (this.plans = plans));
  }
}
