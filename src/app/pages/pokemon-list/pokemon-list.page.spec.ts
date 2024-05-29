import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonListPage} from './pokemon-list.page';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

describe('PokemonListPage', () => {
    let component: PokemonListPage;
    let fixture: ComponentFixture<PokemonListPage>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialize o AngularFire com sua configuração
                AngularFireAuthModule]
        });
        fixture = TestBed.createComponent(PokemonListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
