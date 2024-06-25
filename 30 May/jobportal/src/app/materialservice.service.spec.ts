import { TestBed } from '@angular/core/testing';

import { MaterialserviceService } from './materialservice.service';

describe('MaterialserviceService', () => {
  let service: MaterialserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
