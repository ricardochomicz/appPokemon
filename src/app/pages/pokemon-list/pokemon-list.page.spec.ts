import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonListPage} from './pokemon-list.page';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PokemonListPage', () => {
    let component: PokemonListPage;
    let fixture: ComponentFixture<PokemonListPage>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        fixture = TestBed.createComponent(PokemonListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
