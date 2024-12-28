/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShopDataService } from './shop-data.service';

describe('Service: ShopData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopDataService]
    });
  });

  it('should ...', inject([ShopDataService], (service: ShopDataService) => {
    expect(service).toBeTruthy();
  }));
});
