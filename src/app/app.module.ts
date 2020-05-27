import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardInputComponent } from './components/subscription/card-input/card-input.component';
import { CustomerInformationComponent } from './components/subscription/customer-information/customer-information.component';
import { SubscriptionPlansComponent } from './components/subscription/subscription-plans/subscription-plans.component';
import { SubscriptionPlanItemComponent } from './components/subscription/subscription-plans/subscription-plan-item/subscription-plan-item.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionItemComponent } from './components/subscriptions/subscription-item/subscription-item.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    CardInputComponent,
    CustomerInformationComponent,
    SubscriptionPlansComponent,
    SubscriptionPlanItemComponent,
    SubscriptionsComponent,
    SubscriptionItemComponent,
    SubscriptionComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
