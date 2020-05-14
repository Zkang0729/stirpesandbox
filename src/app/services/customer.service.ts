import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Method': '*',
    }),
  };
  readonly customerUrl: string = 'https://localhost:5001/customer';

  constructor(private httpClient: HttpClient) {}

  // Get a Customer
  public getCustomer(customerId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.customerUrl}/${customerId}`);
  }

  // Add a Customer
  public addCustomer(customerCreateOptions: any): Observable<any> {
    return this.httpClient.post<any>(
      this.customerUrl,
      customerCreateOptions,
      this.httpOptions
    );
  }

  // Update a Customer
  public updateCustomer(
    customerId: string,
    customerUpdateOptions: any
  ): Observable<any> {
    return this.httpClient.put<any>(
      `${this.customerUrl}/${customerId}`,
      customerUpdateOptions,
      this.httpOptions
    );
  }
}
