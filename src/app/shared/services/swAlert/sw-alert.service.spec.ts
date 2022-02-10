import { TestBed } from '@angular/core/testing';

import { SwAlertService } from './sw-alert.service';

describe('SwAlertService', () => {
  let service: SwAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
