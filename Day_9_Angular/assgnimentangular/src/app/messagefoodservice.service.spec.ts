import { TestBed } from '@angular/core/testing';

import { MessagefoodserviceService } from './messagefoodservice.service';

describe('MessagefoodserviceService', () => {
  let service: MessagefoodserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagefoodserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
