import { TestBed } from '@angular/core/testing';

import { ToggleFavoriteService } from './toggle-favorite.service';

describe('ToggleFavoriteService', () => {
  let service: ToggleFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
