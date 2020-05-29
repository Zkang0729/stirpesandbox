import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionScheduleService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Method': '*',
    }),
  };
  readonly subscriptionScheduleUrl: string =
    'https://localhost:5001/subscriptionschedule';

  constructor(private httpClient: HttpClient) {}

  // Get Subscription Schedules for a Customer
  public getSubscriptionSchedulesForACustomer(
    customerId: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${this.subscriptionScheduleUrl}/${customerId}`
    );
  }

  // Create a Subscription Schedule
  public addSubscriptionSchedule(
    subscriptionScheduleCreateOptions: any
  ): Observable<any> {
    return this.httpClient.post<any>(
      this.subscriptionScheduleUrl,
      subscriptionScheduleCreateOptions,
      this.httpOptions
    );
  }

  // Cancel a Subscription Schedule
  public deleteSusbcriptionSchedule(
    subscriptionScheduleId: string
  ): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.subscriptionScheduleUrl}/${subscriptionScheduleId}`
    );
  }
}
