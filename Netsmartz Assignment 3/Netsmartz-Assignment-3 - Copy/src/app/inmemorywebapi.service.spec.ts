import { TestBed } from '@angular/core/testing';

import { InmemorywebapiService } from './inmemorywebapi.service';

describe('InmemorywebapiService', () => {
  let service: InmemorywebapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmemorywebapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
