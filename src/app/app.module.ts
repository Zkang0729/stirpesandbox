import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardInputComponent } from './components/card-input/card-input.component';
import { CustomerInformationComponent } from './components/customer-information/customer-information.component';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { SubscriptionPlanItemComponent } from './components/subscription-plan-item/subscription-plan-item.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionItemComponent } from './components/subscription-item/subscription-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CardInputComponent,
    CustomerInformationComponent,
    SubscriptionPlansComponent,
    SubscriptionPlanItemComponent,
    SubscriptionsComponent,
    SubscriptionItemComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
