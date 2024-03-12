import { TestBed } from '@angular/core/testing';

import { CharaterdetailserviceService } from './charaterdetailservice.service';

describe('CharaterdetailserviceService', () => {
  let service: CharaterdetailserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharaterdetailserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
