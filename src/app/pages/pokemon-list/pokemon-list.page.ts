import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {Pokemon, PokemonApiResponse} from "../../models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {

    pokemons: (Pokemon | { image: string; name: string; id: number })[] = [];
    filteredPokemons: any[] = [];
    ascendingOrder: boolean = true;
    offset: number = 0;
    limit: number = 10;
    searchTerm: string = '';

    constructor(private pokemonService: PokemonService, private router: Router) {
    }

    handleRefresh(event: any) {
        setTimeout(() => {
            this.loadPokemons();
            event.target.complete();
        }, 2000);
    }

    ngOnInit() {
       this.loadPokemons();
    }


    loadPokemons(event?: any) {

        this.pokemonService.getPokemonList(this.offset, this.limit).subscribe((response: PokemonApiResponse) => {
            setTimeout(() => {

                const newPokemons = response.results.map((pokemon, index) => {
                    const id = this.getParamUrlPokemon(pokemon.url);
                    return {
                        id: id,
                        name: pokemon.name,
                        base_experience: pokemon.base_experience,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                    };
                });

                this.pokemons = [...this.pokemons, ...newPokemons];
                this.sortPokemons();
                this.filterPokemons();
                this.offset += this.limit;

            }, 1000);
        }, error => {
            console.error('Erro ao listar Pokémons', error);
            if (event) {
                event.target.complete();
            }
        });
    }


    toggleOrder() {
        this.ascendingOrder = !this.ascendingOrder;
        this.sortPokemons();
        this.filterPokemons();
    }

    sortPokemons() {
        this.pokemons.sort((a, b) => {
            if (this.ascendingOrder) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    }

    filterPokemons(event?: any) {
        const searchTerm = this.searchTerm.toLowerCase();
        this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    }

    private getParamUrlPokemon(url: string): number {
        const parts = url.split('/');
        return parseInt(parts[parts.length - 2], 10);
    }


}
