import { Component, OnInit, Input } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-subscription-plan-item',
  templateUrl: './subscription-plan-item.component.html',
  styleUrls: ['./subscription-plan-item.component.css'],
})
export class SubscriptionPlanItemComponent implements OnInit {
  @Input() plan: any;
  @Input() customerId: string;
  @Input() paymentMethodId: string;

  public quantity: number = null;

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {}

  public setQuantity(quantity: any): void {
    this.quantity = quantity.target.value;
  }

  public onSubmit(): void {
    if (!this.quantity) {
      alert('Quantity must be greater than 0!');
      return;
    }
    const subscriptionCreateOptions = {
      customer: this.customerId,
      items: [
        {
          plan: this.plan.id,
          quantity: Number(this.quantity)
        },
      ],
      defaultPaymentMethod: this.paymentMethodId,
    };
    this.subscriptionService
      .addSubscription(subscriptionCreateOptions)
      .subscribe();
  }
}
