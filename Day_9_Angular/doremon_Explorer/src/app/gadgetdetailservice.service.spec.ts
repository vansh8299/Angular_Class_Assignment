import { TestBed } from '@angular/core/testing';

import { GadgetdetailserviceService } from './gadgetdetailservice.service';

describe('GadgetdetailserviceService', () => {
  let service: GadgetdetailserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GadgetdetailserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
