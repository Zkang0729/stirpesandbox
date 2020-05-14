import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Method': '*',
    }),
  };
  readonly paymentMethodUrl: string = 'https://localhost:5001/paymentmethod';

  constructor(private httpClient: HttpClient) {}

  // Add a Payment Method through the token
  public addPaymentMethodThroughToken(
    paymentMethodCreateOptions: any
  ): Observable<any> {
    return this.httpClient.post<any>(
      this.paymentMethodUrl,
      paymentMethodCreateOptions,
      this.httpOptions
    );
  }

  // Attach a Payment MEthod with a customer
  public attachPaymentMethodToCustomer(
    paymentMethodId: string,
    paymentMethodAttachOptions: any
  ): Observable<any> {
    return this.httpClient.post<any>(
      `${this.paymentMethodUrl}/${paymentMethodId}`,
      paymentMethodAttachOptions,
      this.httpOptions
    );
  }
}
