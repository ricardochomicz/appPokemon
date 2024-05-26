import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pokemon, PokemonApiResponse} from "../models";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

    private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private httpClient: HttpClient) {
    }

    getPokemonList(offset: number, limit: number): Observable<PokemonApiResponse> {
        return this.httpClient.get<PokemonApiResponse>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
    }

    getPokemonByName(name: string): Observable<Pokemon> {
        return this.httpClient.get<Pokemon>(`${this.apiUrl}/${name.toLowerCase()}`);
    }

    getPokemonById(id: number): Observable<Pokemon> {
        return this.httpClient.get<Pokemon>(`${this.apiUrl}/${id}`);
    }
}
