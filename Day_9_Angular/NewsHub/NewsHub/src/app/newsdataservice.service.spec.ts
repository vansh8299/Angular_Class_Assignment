import { TestBed } from '@angular/core/testing';

import { NewsdataserviceService } from './newsdataservice.service';

describe('NewsdataserviceService', () => {
  let service: NewsdataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsdataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
