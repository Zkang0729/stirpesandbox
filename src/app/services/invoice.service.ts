import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Method': '*',
    }),
  };
  readonly invoiceUrl: string = 'https://localhost:5001/invoice';

  constructor(private httpClient: HttpClient) {}

  // Create an Invoice
  public addInvoice(createInvoiceOptions: any): Observable<any> {
    return this.httpClient.post<any>(
      this.invoiceUrl,
      createInvoiceOptions,
      this.httpOptions
    );
  }
}
