import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { switchMap, first } from 'rxjs/operators';
import { InvoiceService } from 'src/app/services/invoice.service';
import { SubscriptionScheduleService } from 'src/app/services/subscription-schedule.service';
import { combineLatest } from 'rxjs';

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
    private subscriptionScheduleService: SubscriptionScheduleService,
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
      prorationBehavior:
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
        }),
        switchMap((invoiceId: string) => {
          return this.invoiceService.chargeInvoice(invoiceId);
        })
      )
      .subscribe();
  }

  public async changePlan(): Promise<void> {
    const subscriptionUpdateOptions = {
      cancelAtPeriodEnd: true,
      prorationBehavior: 'none',
    };
    const subscriptionCreateOptions = {
      customer: this.subscription.customerId,
      items: [
        {
          plan: this.yearlyId,
          quantity: Number =
            this.quantity === null
              ? this.subscription.items[0].quantity
              : this.quantity,
        },
      ],
      backdateStartDate: this.subscription.currentPeriodStart,
    };
    const subscriptionReactivateOptions = {
      cancelAtPeriodEnd: false,
    };
    if (this.subscription.cancelAtPeriodEnd) {
      this.subscriptionService
        .updateSubscription(this.subscription.id, subscriptionReactivateOptions)
        .subscribe();
      const subscriptionSchedules = await this.subscriptionScheduleService
        .getSubscriptionSchedulesForACustomer(this.subscription.customerId)
        .pipe(first())
        .toPromise();
      for (const subscriptionSchedule of subscriptionSchedules) {
        await this.subscriptionScheduleService
          .deleteSusbcriptionSchedule(subscriptionSchedule.id)
          .pipe(first())
          .toPromise();
      }
    } else {
      (this.subscription.items[0].plan.nickname === 'Monthly'
        ? this.subscriptionService
            .deleteSubscription(this.subscription.id, false, true)
            .pipe(
              switchMap(() => {
                return this.subscriptionService.addSubscription(
                  subscriptionCreateOptions
                );
              })
            )
        : this.subscriptionService
            .updateSubscription(this.subscription.id, subscriptionUpdateOptions)
            .pipe(
              switchMap(() => {
                const subscriptionScheduleCreateOptions = {
                  customer: this.subscription.customerId,
                  endBehavior: 'release',
                  phases: [
                    {
                      plans: [
                        {
                          price: this.monthlyId,
                          quantity:
                            this.quantity === null
                              ? this.subscription.items[0].quantity
                              : this.quantity,
                        },
                      ],
                    },
                  ],
                };
                return this.subscriptionScheduleService.addSubscriptionSchedule(
                  subscriptionScheduleCreateOptions
                );
              })
            )
      ).subscribe();
    }
  }

  public toggleInvoiceNow(): void {
    this.invoiceNow = !this.invoiceNow;
  }

  public onDelete(): void {
    this.subscriptionService
      .deleteSubscription(this.subscription.id, this.invoiceNow, false)
      .subscribe();
  }
}
