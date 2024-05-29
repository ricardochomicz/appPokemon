import {Injectable} from '@angular/core';
import {Pokemon} from "../models";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "./auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {

    private storageKey = 'favoritePokemons';
    private ratingsKey = 'ratings';
    private favorites: Pokemon[] = [];
    private ratings: { [key: string]: number } = {};

    private favoritesSubject = new BehaviorSubject<number>(0);

    constructor(private authService: AuthService, private afAuth: AngularFireAuth) {
        this.afAuth.onAuthStateChanged(user => {
        if (user) {
            this.loadFavorites(user.uid);
            this.loadRatings();
        }
        });
    }

    addFavorite(pokemon: Pokemon) {
        const user = this.authService.getUserUidSession();
        if (user) {
            const favorites = this.getFavorites(user);
            if (!this.isFavorite(pokemon.name, user)) {
                favorites.push(pokemon);
                this.saveFavorites(user, favorites);
            }
        } else {
            console.error('Usuário não autenticado');
        }
    }

    removeFavorite(pokemonName: string) {
        const user = this.authService.getUserUidSession()
        if (user) {
            let favorites = this.getFavorites(user);
            favorites = favorites.filter(fav => fav.name !== pokemonName);
            this.saveFavorites(user, favorites);
        } else {
            console.error('Usuário não autenticado');
        }
    }

    getFavorites(user: string): Pokemon[] {
        const sessionKey = this.getSessionKey(this.storageKey, user);
        const favoritesJson = localStorage.getItem(sessionKey);
        return favoritesJson ? JSON.parse(favoritesJson) : [];
    }

    getFavoritesObservable() {
        return this.favoritesSubject.asObservable();
    }

    isFavorite(pokemonName: string, user: string): boolean {
        const favorites = this.getFavorites(user);
        return favorites.some(fav => fav.name === pokemonName);
    }

    getFavoritesCount() {
        return this.favoritesSubject.asObservable();
    }

    setRating(pokemonName: string, rating: number) {
        const userUid = this.authService.getUserUidSession();
        if (userUid) {
            const ratingsKey = this.getSessionKey('ratings', userUid);
            let ratings = localStorage.getItem(ratingsKey);
            if (!ratings) {
                ratings = '{}';
            }
            const parsedRatings = JSON.parse(ratings);
            parsedRatings[pokemonName] = rating;
            localStorage.setItem(ratingsKey, JSON.stringify(parsedRatings));
        } else {
            console.error('Usuário não autenticado');
        }
    }


    getRating(pokemonName: string): number {
        const userUid = this.authService.getUserUidSession();
        if (userUid) {
            const ratingsKey = this.getSessionKey('ratings', userUid);
            const ratings = localStorage.getItem(ratingsKey);
            const parsedRatings = ratings ? JSON.parse(ratings) : {};
            return parsedRatings[pokemonName] || 0;
        } else {
            console.error('Usuário não autenticado');
            return 0;
        }
    }


    private saveFavorites(user: string, favorites: Pokemon[]) {
        const sessionKey = this.getSessionKey(this.storageKey, user);
        localStorage.setItem(sessionKey, JSON.stringify(favorites));
        this.favoritesSubject.next(favorites.length);
    }

    private loadFavorites(uid: string) {
        const sessionKey = this.getSessionKey(this.storageKey, uid);
        const favoritesJson = localStorage.getItem(sessionKey);
        this.favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
        this.favoritesSubject.next(this.favorites.length);
    }

    private loadRatings() {
        const ratings = sessionStorage.getItem(this.ratingsKey);
        this.ratings = ratings ? JSON.parse(ratings) : {};
        const user = this.afAuth.currentUser;
        if (user) {
            // @ts-ignore
            this.getFavorites(user.uid).forEach(pokemon => {
                this.ratings[pokemon.name] = this.ratings[pokemon.name];
            });
        }
    }

    private getSessionKey(baseKey: string, uid: string): string {
        return `${baseKey}_${uid}`;
    }
}
