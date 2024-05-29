import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonFavoritePage} from './pokemon-favorite.page';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

describe('PokemonFavoritePage', () => {
    let component: PokemonFavoritePage;
    let fixture: ComponentFixture<PokemonFavoritePage>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialize o AngularFire com sua configuração
                AngularFireAuthModule]
        });
        fixture = TestBed.createComponent(PokemonFavoritePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
