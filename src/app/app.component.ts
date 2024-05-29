import {Component, OnInit} from '@angular/core';
import {FavoriteService} from "./services/favorite.service";
import {ThemeService} from "./services/theme.service";
import {AuthService} from "./services/auth.service";
import firebase from "firebase/compat/app";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public appPages = [
        {title: 'Pokémon', url: '/pokemons', icon: 'bug'},
        {title: 'Meus Favoritos', url: '/pokemon-favorites', icon: 'heart'},
    ];

    userAuthenticated = false;

    paletteToggle = false;

    favoritesCount: number = 0;

    constructor(private favoriteService: FavoriteService, private themeService: ThemeService, private authService: AuthService) {

        const user = this.authService.getUserUidSession()
        if (user) {
            this.favoriteService.getFavoritesCount().subscribe(count => {
                this.favoritesCount = count;
            });

            // Carregar favoritos para inicializar o contador
            this.favoriteService.getFavorites(user);
        }

    }

    ngOnInit() {
        this.paletteToggle = true;
        this.themeService.toggleTheme()
        this.authService.isUserAuthenticated().subscribe(isAuthenticated => {
            this.userAuthenticated = isAuthenticated;
        });
    }

    toggleChange(ev: any) {
        this.themeService.toggleDarkPalette(ev.detail.checked);
    }

    logout() {
        this.authService.logout();
    }

}
