import { TestBed } from '@angular/core/testing';

import { EcgDataService } from './ecg-data.service';

describe('EcgDataService', () => {
  let service: EcgDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcgDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
