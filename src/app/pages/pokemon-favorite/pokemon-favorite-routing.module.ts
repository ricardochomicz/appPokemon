import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonFavoritePage } from './pokemon-favorite.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonFavoritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonFavoritePageRoutingModule {}
