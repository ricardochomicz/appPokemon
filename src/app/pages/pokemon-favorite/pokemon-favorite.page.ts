import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from "../../models";
import {FavoriteService} from "../../services/favorite.service";
import {ToggleFavoriteService} from "../../services/toggle-favorite.service";
import {RatingService} from "../../services/rating.service";

@Component({
  selector: 'app-pokemon-favorite',
  templateUrl: './pokemon-favorite.page.html',
  styleUrls: ['./pokemon-favorite.page.scss'],
})
export class PokemonFavoritePage implements OnInit {
    rat: number = 0
    @Input() rating: number = 0
    @Input() poke: Pokemon | undefined;
    @Output() ratingChange = new EventEmitter<{ poke: Pokemon, rating: number }>();
    pokemons: Pokemon[] = [];
    pokemon: Pokemon | undefined;

    constructor(private favoriteService: FavoriteService,
                private toggleFavoriteService: ToggleFavoriteService,
                private ratingService: RatingService) {
    }

    ngOnInit() {
        this.getFavorites()

    }

    getFavorites() {
        this.pokemons = this.favoriteService.getFavorites();
        this.pokemons.forEach(pokemon => {
            this.getRating(pokemon)
        });

    }

    toggleFavorite(pokemon: Pokemon) {
        this.toggleFavoriteService.toggleFavorite(pokemon)
    }

    isFavorite(pokemonName: string): boolean {
        return this.toggleFavoriteService.isFavorite(pokemonName)
    }

    setRating(pokemon: Pokemon, rating: number) {
        console.log(pokemon.name, rating)
        this.favoriteService.setRating(pokemon.name, rating);
        pokemon.rating = rating;
    }

    getRating(pokemon: Pokemon){
        pokemon.rating = this.favoriteService.getRating(pokemon)
    }

}
