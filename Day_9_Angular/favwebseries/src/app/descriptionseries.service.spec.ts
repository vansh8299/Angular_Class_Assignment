import { TestBed } from '@angular/core/testing';

import { DescriptionseriesService } from './descriptionseries.service';

describe('DescriptionseriesService', () => {
  let service: DescriptionseriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionseriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
