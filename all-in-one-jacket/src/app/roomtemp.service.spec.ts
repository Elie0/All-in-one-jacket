import { TestBed } from '@angular/core/testing';

import { RoomtempService } from './roomtemp.service';

describe('RoomtempService', () => {
  let service: RoomtempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomtempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
