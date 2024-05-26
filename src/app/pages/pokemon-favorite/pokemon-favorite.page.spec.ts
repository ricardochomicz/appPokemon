import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonFavoritePage } from './pokemon-favorite.page';

describe('PokemonFavoritePage', () => {
  let component: PokemonFavoritePage;
  let fixture: ComponentFixture<PokemonFavoritePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonFavoritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
