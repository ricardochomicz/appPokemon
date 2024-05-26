import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonFavoritePageRoutingModule } from './pokemon-favorite-routing.module';

import { PokemonFavoritePage } from './pokemon-favorite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonFavoritePageRoutingModule
  ],
  declarations: [PokemonFavoritePage]
})
export class PokemonFavoritePageModule {}
