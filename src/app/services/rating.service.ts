import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

    private storageKey = 'pokemonRatings';
    private ratings: { [key: string]: number } = {};
    private ratingsSubject = new BehaviorSubject<{ [key: string]: number }>(this.getRatings());

    constructor() {
        this.loadRatings();
    }

    private loadRatings() {
        const ratings = sessionStorage.getItem(this.storageKey);
        this.ratings = ratings ? JSON.parse(ratings) : {};
        this.ratingsSubject.next(this.ratings);
    }

    private saveRatings() {
        sessionStorage.setItem(this.storageKey, JSON.stringify(this.ratings));
        this.ratingsSubject.next(this.ratings);
    }

    getRatings(): { [key: string]: number } {
        const ratings = sessionStorage.getItem(this.storageKey);
        return ratings ? JSON.parse(ratings) : {};
    }

    getRating(pokemonId: string): number {
        return this.ratings[pokemonId] || 0;
    }

    setRating(pokemonId: string, rating: number): void {
        this.ratings[pokemonId] = rating;
        this.saveRatings();
    }

    getRatingsObservable() {
        return this.ratingsSubject.asObservable();
    }
}
