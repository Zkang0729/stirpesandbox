import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  readonly planUrl: string = 'https://localhost:5001/plan';

  constructor(private httpClient: HttpClient) {}

  // Get Subscriptions
  public getPlans(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.planUrl);
  }
}
