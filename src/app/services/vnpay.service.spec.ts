import { TestBed } from '@angular/core/testing';

import { VnpayService } from './vnpay.service';

describe('VnpayService', () => {
  let service: VnpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VnpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
