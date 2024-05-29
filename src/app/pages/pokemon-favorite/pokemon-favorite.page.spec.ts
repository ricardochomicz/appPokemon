import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonFavoritePage} from './pokemon-favorite.page';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PokemonFavoritePage', () => {
    let component: PokemonFavoritePage;
    let fixture: ComponentFixture<PokemonFavoritePage>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        fixture = TestBed.createComponent(PokemonFavoritePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
