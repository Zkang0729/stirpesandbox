import { TestBed } from '@angular/core/testing';

import { SubscriptionScheduleService } from './subscription-schedule.service';

describe('SubscriptionScheduleService', () => {
  let service: SubscriptionScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
