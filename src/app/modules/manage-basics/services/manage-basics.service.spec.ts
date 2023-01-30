import { TestBed } from '@angular/core/testing';

import { ManageBasicsService } from './manage-basics.service';

describe('ManageBasicsService', () => {
  let service: ManageBasicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageBasicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
