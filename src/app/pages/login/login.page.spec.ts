import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import {AuthService} from "../../services/auth.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [
              AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialize o AngularFire com sua configuração
              AngularFireAuthModule
          ],
          providers: [AuthService]
      });
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
