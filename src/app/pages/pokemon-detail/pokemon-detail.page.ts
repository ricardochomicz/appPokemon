import { Component, OnInit } from '@angular/core';
import {Pokemon} from "../../models";
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonService} from "../../services/pokemon.service";
import {ToggleFavoriteService} from "../../services/toggle-favorite.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {

    pokemon: Pokemon | undefined;
    moves!: string;
    height!: any;
    weight!: any;
    abilities!: string;
    types!: string;

    userAuthenticated = false;


    constructor(private route: ActivatedRoute,
                private pokemonService: PokemonService,
                private toggleFavoriteService: ToggleFavoriteService,
                private authService: AuthService,
                private router: Router
                ) {
    }

    ngOnInit() {
        const pokemonId = this.route.snapshot.paramMap.get('pokemon');
        if (pokemonId) {
            this.pokemonService.getPokemonByName(pokemonId).subscribe((pokemon: Pokemon) => {
                this.pokemon = pokemon;
                this.height = (pokemon.height / 10).toFixed(1);
                this.weight = (pokemon.weight / 10).toFixed(2);
                this.abilities = pokemon.abilities[0].ability.name
                this.types = pokemon.types[0].type.name
                this.moves = pokemon.moves[0].move.name
            });
        }
    }

    toggleFavorite(pokemon: Pokemon) {
            this.toggleFavoriteService.toggleFavorite(pokemon);
    }

    isFavorite(pokemonName: string): boolean {
        return this.toggleFavoriteService.isFavorite(pokemonName);
    }
}
