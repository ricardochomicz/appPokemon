import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from "../../models";
import {FavoriteService} from "../../services/favorite.service";
import {ToggleFavoriteService} from "../../services/toggle-favorite.service";
import {AuthService} from "../../services/auth.service";
import {WebSocketService} from "../../services/web-socket.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";


class SessionStorageService {
}

@Component({
    selector: 'app-pokemon-favorite',
    templateUrl: './pokemon-favorite.page.html',
    styleUrls: ['./pokemon-favorite.page.scss'],
})
export class PokemonFavoritePage implements OnInit {

    @Input() rating: number = 0
    @Input() poke: Pokemon | undefined;
    @Output() ratingChange = new EventEmitter<{ poke: Pokemon, rating: number }>();
    pokemons: Pokemon[] = [];
    pokemon: Pokemon | undefined;
    userAuthenticated = false;
    receivedData: any;

    constructor(private favoriteService: FavoriteService,
                private toggleFavoriteService: ToggleFavoriteService,
                private authService: AuthService,
                private webSocketService: WebSocketService,
                private afAuth: AngularFireAuth) {

    }

    ngOnInit() {
        this.authService.isUserAuthenticated().subscribe(isAuthenticated => {
            this.userAuthenticated = isAuthenticated;
        });
         this.afAuth.onAuthStateChanged(user => {
             if(user){
                 if (user.uid === this.authService.getUserUidSession()) {
                     this.loadFavorites();
                 }
             }
        });
        // this.webSocketService.getDataObservable().subscribe(data => {
        //     this.receivedData = data;
        // });
    }

    loadFavorites() {
        const user = this.authService.getUserUidSession();
        if (user) {
            this.pokemons = this.favoriteService.getFavorites(user);
            this.pokemons.forEach(pokemon => {
                this.getRating(pokemon);
            });
        }
    }

    toggleFavorite(pokemon: Pokemon) {
        this.toggleFavoriteService.toggleFavorite(pokemon)
    }

    isFavorite(pokemonName: string): any {
         this.toggleFavoriteService.isFavorite(pokemonName)
    }

    setRating(pokemon: Pokemon, rating: number) {
        this.favoriteService.setRating(pokemon.name, rating);
        pokemon.rating = rating;
    }

    getRating(pokemon: Pokemon) {
        const user = this.authService.getUserUidSession()
        // @ts-ignore
        pokemon.rating = this.favoriteService.getRating(pokemon, user)
    }

}
