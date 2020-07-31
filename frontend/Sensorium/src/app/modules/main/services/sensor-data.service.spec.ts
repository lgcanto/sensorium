import { TestBed } from '@angular/core/testing';

import { SensorDataService } from './sensor-data.service';

describe('SensorDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorDataService = TestBed.get(SensorDataService);
    expect(service).toBeTruthy();
  });
});
