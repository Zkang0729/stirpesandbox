import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-subscription-item',
  templateUrl: './subscription-item.component.html',
  styleUrls: ['./subscription-item.component.css'],
})
export class SubscriptionItemComponent implements OnInit {
  @Input() subscription: any;
  @Input() monthlyId: string = null;
  @Input() yearlyId: string = null;

  public customerName: string;
  public quantity: number = null;

  constructor(
    private customerService: CustomerService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.customerService
      .getCustomer(this.subscription.customerId)
      .subscribe((customerName) => (this.customerName = customerName));
  }

  public setQuantity(quantity: any): void {
    this.quantity = quantity.target.value;
    const subscriptionUpdateOptions = {
      items: [
        {
          id: this.subscription.items[0].id,
          quantity: Number(this.quantity),
        },
      ],
      proration_behavior: 'create_prorations',
    };
    this.subscriptionService
      .updateSubscription(this.subscription.id, subscriptionUpdateOptions)
      .pipe(debounceTime(1000))
      .subscribe();
  }

  public changePlan() {
    const subscriptionUpdateOptions = {
      items: [
        {
          deleted: true,
          id: this.subscription.items[0].id,
          quantity: Number = this.subscription.items[0].quantity,
        },
        {
          plan:
            this.subscription.items[0].plan.nickname === 'Monthly'
              ? this.yearlyId
              : this.monthlyId,
          deleted: false,
          quantity: Number =
            this.quantity === null
              ? this.subscription.items[0].quantity
              : this.quantity,
        },
      ],
      proration_behavior: 'create_prorations',
    };
    this.subscriptionService
      .updateSubscription(this.subscription.id, subscriptionUpdateOptions)
      .subscribe();
  }
}
