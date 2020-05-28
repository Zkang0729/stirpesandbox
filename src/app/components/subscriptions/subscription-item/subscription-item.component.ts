import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { InvoiceService } from 'src/app/services/invoice.service';

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
  public invoiceNow = false;
  public proration = false;

  constructor(
    private customerService: CustomerService,
    private subscriptionService: SubscriptionService,
    private invoiceService: InvoiceService
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
      proration_behavior:
        this.quantity > this.subscription.items[0]
          ? 'create_proration'
          : 'none',
    };
    this.subscriptionService
      .updateSubscription(this.subscription.id, subscriptionUpdateOptions)
      .pipe(
        switchMap(() => {
          const createInvoiceOptions = {
            customer: this.subscription.customerId,
          };
          return this.invoiceService.addInvoice(createInvoiceOptions);
        })
      )
      .subscribe();
  }

  public changePlan() {
    const subscriptionUpdateOptions = {
      cancel_at_period_end:
        this.subscription.items[0].plan.nickname === 'Monthly' ? false : true,
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
      proration_behavior:
        this.subscription.items[0].plan.nickname === 'Monthly'
          ? 'create_proration'
          : 'none',
    };
    this.subscriptionService
      .updateSubscription(this.subscription.id, subscriptionUpdateOptions)
      .subscribe();
  }

  public toggleInvoiceNow() {
    this.invoiceNow = !this.invoiceNow;
  }

  public onDelete() {
    this.subscriptionService
      .deleteSubscription(this.subscription.id, this.invoiceNow)
      .subscribe();
  }
}
