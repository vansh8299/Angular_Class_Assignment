import { TestBed } from '@angular/core/testing';

import { InmemorycharacterService } from './inmemorycharacter.service';

describe('InmemorycharacterService', () => {
  let service: InmemorycharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmemorycharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
