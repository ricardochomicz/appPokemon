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
  ];

    paletteToggle = false;

    favoritesCount: number = 0;
    constructor(private favoriteService: FavoriteService, private themeService: ThemeService) {

    }

    ngOnInit(){
        this.favoriteService.getFavoritesCount().subscribe(count => {
            this.favoritesCount = count;
        });
        this.paletteToggle = true;
      this.themeService.toggleTheme()
    }

    toggleChange(ev: any) {
        this.themeService.toggleDarkPalette(ev.detail.checked);
    }

}
