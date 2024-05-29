import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialize o AngularFire com sua configuração
            AngularFireAuthModule
        ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
