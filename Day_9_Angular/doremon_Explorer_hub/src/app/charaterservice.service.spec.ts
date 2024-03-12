import { TestBed } from '@angular/core/testing';

import { CharaterserviceService } from './charaterservice.service';

describe('CharaterserviceService', () => {
  let service: CharaterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharaterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
