import { TestBed } from '@angular/core/testing';

import { ToggleFavoriteService } from './toggle-favorite.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ToggleFavoriteService', () => {
  let service: ToggleFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ToggleFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
