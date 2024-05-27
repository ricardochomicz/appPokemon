import { Injectable } from '@angular/core';
import {Pokemon} from "../models";
import {FavoriteService} from "./favorite.service";
import {ToastService} from "./toast.service";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ToggleFavoriteService {

    pokemon: Pokemon | undefined;
    userAuthenticated = false;
    constructor( private favoriteService: FavoriteService,
                 private toastService: ToastService,
                 private authService: AuthService,
                 private router: Router) { }

    toggleFavorite(pokemon: Pokemon) {
        this.authService.isUserAuthenticated().subscribe(isAuthenticated => {
            this.userAuthenticated = isAuthenticated;
            if(!this.userAuthenticated){
                this.toastService.toastMessage('Redirecionando para o login.');
                this.router.navigate(['/login']);
            }
            else if (pokemon) {
                if (this.isFavorite(pokemon.name)) {
                    this.favoriteService.removeFavorite(pokemon.name);
                    this.toastService.toastMessage('Pokémon removido dos favoritos!');
                } else {
                    this.favoriteService.addFavorite(pokemon);
                    this.toastService.toastMessage('Pokémon adicionado aos favoritos!');
                }
            }
        });
    }

    isFavorite(pokemonName: string): boolean {
        return this.favoriteService.isFavorite(pokemonName);
    }
}
