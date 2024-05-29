import {Injectable} from '@angular/core';
import {Pokemon} from "../models";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import firebase from "firebase/compat/app";

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {

    private storageKey = 'favoritePokemons';
    private ratingsKey = 'ratings';
    private favorites: Pokemon[] = [];
    private ratings: { [key: string]: number } = {};

    private favoritesSubject = new BehaviorSubject<number>(0);

    constructor(private authService: AuthService,
                private afAuth: AngularFireAuth,
                private http: HttpClient) {
        const user = this.authService.getUserUidSession()
        if (user) {
            this.loadFavorites(user);
            this.loadRatings(user);
        }
    }

    addFavorite(pokemon: Pokemon) {
        const user = this.authService.getUserUidSession();
        if (user) {
            const favorites = this.getFavorites(user);
            if (!this.isFavorite(pokemon.name, user)) {
                favorites.push(pokemon);
                this.saveFavorites(user, favorites);
                this.sendWebhook(pokemon, 'favorited')
                this.favoritesSubject.next(favorites.length);
            }
        }
    }

    removeFavorite(pokemonName: string) {
        const user = this.authService.getUserUidSession()
        if (user) {
            let favorites = this.getFavorites(user);
            favorites = favorites.filter(fav => fav.name !== pokemonName);
            this.saveFavorites(user, favorites);
            this.favoritesSubject.next(favorites.length);
        }
    }

    getFavorites(user: string): Pokemon[] {
        const sessionKey = this.getSessionKey(this.storageKey, user);
        const favoritesJson = localStorage.getItem(sessionKey);
        const favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
        this.favoritesSubject.next(favorites.length); // Atualiza o BehaviorSubject
        return favorites;

    }

    getFavoritesObservable() {
        return this.favoritesSubject.asObservable();
    }

    isFavorite(pokemonName: string, user: string): any {
        const favorites = this.getFavorites(user);
        return favorites.some(fav => fav.name === pokemonName);
    }

    getFavoritesCount(): Observable<number> {
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
        }
    }


    getRating(pokemon: Pokemon): any {
        const user = this.authService.getUserUidSession()
        if (user) {
            // const ratingsKey = this.getSessionKey('ratings', user);
            // const ratings = localStorage.getItem(ratingsKey);
            // const parsedRatings = ratings ? JSON.parse(ratings) : {};
            // return parsedRatings[pokemonName] || 0;

            this.loadRatings(user); // Ensure ratings are loaded
            return this.ratings[pokemon.name] || 0;
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

    private loadRatings(uid: string) {

        const sessionKey = this.getSessionKey('ratings', uid);
        const ratingsJson = localStorage.getItem(sessionKey);
        this.ratings = ratingsJson ? JSON.parse(ratingsJson) : {};

        const favorites = this.getFavorites(uid);
        favorites.forEach(pokemon => {
            this.ratings[pokemon.name] = this.ratings[pokemon.name]
        });
    }


    private getSessionKey(baseKey: string, uid: string): string {
        return `${baseKey}_${uid}`;
    }

    private sendWebhook(pokemon: Pokemon | { name: string }, action: string) {
        const userUid = this.authService.getUserUidSession();
        const webhookUrl = 'http://localhost:8080/webhook';
        const payload = {
            action: action,
            pokemon: pokemon,
            user: userUid
        };
        this.http.post(webhookUrl, payload).subscribe(response => {
            console.log('Webhook sent:', response);
        }, error => {
            console.error('Error sending webhook:', error);
        });
    }
}
