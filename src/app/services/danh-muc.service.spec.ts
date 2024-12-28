/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DanhMucService } from './danh-muc.service';

describe('Service: DanhMuc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DanhMucService]
    });
  });

  it('should ...', inject([DanhMucService], (service: DanhMucService) => {
    expect(service).toBeTruthy();
  }));
});
