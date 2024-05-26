import {Component, OnInit} from '@angular/core';
import {FavoriteService} from "./services/favorite.service";
import {ThemeService} from "./services/theme.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Login', url: '/login', icon: 'person-circle' },
    { title: 'Pokémon', url: '/pokemons', icon: 'bug' },
    { title: 'Meus Favoritos', url: '/pokemon-favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

    favoritesCount: number = 0;
    constructor(private favoriteService: FavoriteService, private themeService: ThemeService) {

    }

    ngOnInit(){
        this.favoriteService.getFavoritesCount().subscribe(count => {
            this.favoritesCount = count;
        });
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }
}
