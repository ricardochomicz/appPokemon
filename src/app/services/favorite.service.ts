import { Injectable } from '@angular/core';
import {Pokemon} from "../models";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

    private storageKey = 'favoritePokemons';
    private ratingsKey = 'ratings';
    private favorites: Pokemon[] = [];
    private ratings: { [key: string]: number } = {};

    private favoritesSubject = new BehaviorSubject<number>(0);


    constructor() {
        this.loadFavorites()
        this.loadRatings();
    }

    addFavorite(pokemon: Pokemon) {
        const favorites = this.getFavorites();
        if (!this.isFavorite(pokemon.name)) {
            favorites.push(pokemon);
            sessionStorage.setItem(this.storageKey, JSON.stringify(favorites));
            this.saveFavorites();
            this.getFavorites();
        }

    }

    removeFavorite(pokemonName: string) {
        let favorites = this.getFavorites();
        this.favorites = favorites.filter(fav => fav.name !== pokemonName);
        sessionStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
        this.saveFavorites();
    }

    getFavorites(): Pokemon[] {
        const favorites = sessionStorage.getItem(this.storageKey);
        return favorites ? JSON.parse(favorites) : [];
    }

    isFavorite(pokemonName: string): boolean {
        const favorites = this.getFavorites();
        return favorites.some(fav => fav.name === pokemonName);
    }

    getFavoritesCount() {
        return this.favoritesSubject.asObservable();

    }

    setRating(pokemonName: string, rating: number) {
        this.ratings[pokemonName] = rating;
        sessionStorage.setItem(this.ratingsKey, JSON.stringify(this.ratings));
    }

    getRating(pokemon: Pokemon) {
        this.loadRatings(); // Ensure ratings are loaded
        return this.ratings[pokemon.name] || 0;
    }

    private saveFavorites() {
        const favorites = this.getFavorites();
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
        const count = favorites.length;
        console.log('Saving favorites. Count:', count);
        this.favoritesSubject.next(count);
    }

    private loadFavorites() {
        const favoritesJson = sessionStorage.getItem('favorites');
        if (favoritesJson) {
            this.favorites = JSON.parse(favoritesJson);
            const count = this.favorites.length;
            console.log('Loading favorites. Count:', count);
            this.favoritesSubject.next(count);
        }
    }

    private loadRatings() {
        const ratings = sessionStorage.getItem(this.ratingsKey);
        this.ratings = ratings ? JSON.parse(ratings) : {};
        this.getFavorites().forEach(pokemon => {
            this.ratings[pokemon.name] = this.ratings[pokemon.name];
        });
    }

}
