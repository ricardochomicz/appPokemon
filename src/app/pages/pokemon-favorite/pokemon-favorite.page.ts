import { Component, OnInit } from '@angular/core';
import {Pokemon} from "../../models";
import {FavoriteService} from "../../services/favorite.service";
import {ToggleFavoriteService} from "../../services/toggle-favorite.service";

@Component({
  selector: 'app-pokemon-favorite',
  templateUrl: './pokemon-favorite.page.html',
  styleUrls: ['./pokemon-favorite.page.scss'],
})
export class PokemonFavoritePage implements OnInit {
    pokemons: Pokemon[] = [];
    pokemon: Pokemon | undefined;

    constructor(private favoriteService: FavoriteService, private toggleFavoriteService: ToggleFavoriteService) {
    }

    ngOnInit() {
        this.getFavorites()
    }

    getFavorites() {
        this.pokemons = this.favoriteService.getFavorites();
    }

    toggleFavorite(pokemon: Pokemon) {
        this.toggleFavoriteService.toggleFavorite(pokemon)
    }

    isFavorite(pokemonName: string): boolean {
        return this.toggleFavoriteService.isFavorite(pokemonName)    }

}
