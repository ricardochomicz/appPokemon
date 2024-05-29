import { TestBed } from '@angular/core/testing';

import { RatingService } from './rating.service';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialize o AngularFire com sua configuração
            AngularFireAuthModule
        ],
    });
    service = TestBed.inject(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
