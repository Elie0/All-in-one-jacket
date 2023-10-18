import { TestBed } from '@angular/core/testing';

import { OxyHeartService } from './oxy-heart.service';

describe('OxyHeartService', () => {
  let service: OxyHeartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OxyHeartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
