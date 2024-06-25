import { TestBed } from '@angular/core/testing';

import { InstallappServiceService } from './installapp-service.service';

describe('InstallappServiceService', () => {
  let service: InstallappServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallappServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
