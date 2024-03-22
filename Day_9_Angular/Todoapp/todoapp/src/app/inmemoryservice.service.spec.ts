import { TestBed } from '@angular/core/testing';

import { InmemoryserviceService } from './inmemoryservice.service';

describe('InmemoryserviceService', () => {
  let service: InmemoryserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmemoryserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
