import { TestBed } from '@angular/core/testing';

import { ToggleFavoriteService } from './toggle-favorite.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

describe('ToggleFavoriteService', () => {
  let service: ToggleFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialize o AngularFire com sua configuração
            AngularFireAuthModule]
    });
    service = TestBed.inject(ToggleFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
