import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pokemons',
    loadChildren: () => import('./pages/pokemon-list/pokemon-list.module').then( m => m.PokemonListPageModule)
  },
  {
    path: 'pokemon-favorites',
    loadChildren: () => import('./pages/pokemon-favorite/pokemon-favorite.module').then( m => m.PokemonFavoritePageModule)
  },
  {
    path: 'pokemon-detail/:pokemon',
    loadChildren: () => import('./pages/pokemon-detail/pokemon-detail.module').then( m => m.PokemonDetailPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
