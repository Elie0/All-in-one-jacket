import { TestBed } from '@angular/core/testing';

import { TogglesideService } from './toggleside.service';

describe('TogglesideService', () => {
  let service: TogglesideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TogglesideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
