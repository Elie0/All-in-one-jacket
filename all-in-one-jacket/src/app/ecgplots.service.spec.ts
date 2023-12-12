import { TestBed } from '@angular/core/testing';

import { EcgplotsService } from './ecgplots.service';

describe('EcgplotsService', () => {
  let service: EcgplotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcgplotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
