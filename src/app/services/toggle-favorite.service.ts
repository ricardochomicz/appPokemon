import { Injectable } from '@angular/core';
import {Pokemon} from "../models";
import {FavoriteService} from "./favorite.service";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class ToggleFavoriteService {

    pokemon: Pokemon | undefined;
    constructor( private favoriteService: FavoriteService, private toastService: ToastService) { }

    toggleFavorite(pokemon: Pokemon) {
        if (pokemon) {
            if (this.isFavorite(pokemon.name)) {
                this.favoriteService.removeFavorite(pokemon.name);
                this.toastService.toastMessage('Pokémon removido dos favoritos!');
            } else {
                this.favoriteService.addFavorite(pokemon);
                this.toastService.toastMessage('Pokémon adicionado aos favoritos!');
            }
        }

    }

    isFavorite(pokemonName: string): boolean {
        return this.favoriteService.isFavorite(pokemonName);
    }
}
