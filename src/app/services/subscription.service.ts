import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Method': '*',
    }),
  };
  readonly subscriptionUrl = 'https://localhost:5001/subscription';

  constructor(private httpClient: HttpClient) {}

  // Get Subscriptions
  public getSubscriptions(): Observable<any> {
    return this.httpClient.get<any[]>(this.subscriptionUrl);
  }

  // Add a Subscription
  public addSubscription(subscriptionCreateOptions: any): Observable<any> {
    return this.httpClient.post<any>(
      this.subscriptionUrl,
      subscriptionCreateOptions,
      this.httpOptions
    );
  }

  // Update a Subscription
  public updateSubscription(
    subscriptionId: string,
    subscriptionUpdateOptions: any
  ): Observable<any> {
    return this.httpClient.put<any>(
      `${this.subscriptionUrl}/${subscriptionId}`,
      subscriptionUpdateOptions,
      this.httpOptions
    );
  }

  // Delete a Susbcription
  public deleteSubscription(
    subscriptionId: string,
    invoiceNow: boolean,
    proration: boolean
  ): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.subscriptionUrl}/${subscriptionId}/${invoiceNow}/${proration}`,
      this.httpOptions
    );
  }
}
