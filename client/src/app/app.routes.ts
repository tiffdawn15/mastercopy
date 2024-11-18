import { Routes } from '@angular/router';
import { PictureBoardComponent } from './picture-board/picture-board.component';
import { ExploreComponent } from './explore/explore.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/home.component').then((mod) => mod.HomeComponent),
  },
  { path: 'artworks', component: PictureBoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'search', component: PictureBoardComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'callback',
    loadComponent: () =>
      import('./callback/callback.component').then(
        (mod) => mod.CallbackComponent
      ),
  },
  {
    path: `artwork/:id}`,
    loadComponent: () =>
      import('./art-work/art-work.component').then(
        (mod) => mod.ArtWorkComponent
      ),
  },
];
