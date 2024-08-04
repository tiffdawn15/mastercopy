import { Routes } from '@angular/router';
import { PictureBoardComponent } from './picture-board/picture-board.component';
import { ExploreComponent } from './explore/explore.component';
import { ArtWorkComponent } from './art-work/art-work.component';

// export const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () =>
//       import('./picture-board/picture-board.component').then(
//         (mod) => mod.PictureBoardComponent
//       ),
//   },
//   {
//     path: 'explore',
//     pathMatch: 'full',
//     loadComponent: () =>
//       import('./explore/explore.component').then((mod) => mod.ExploreComponent),
//   },
//   {
//     path: `artwork/{$id}`,
//     pathMatch: 'full',
//     loadComponent: () =>
//       import('./art-work/art-work.component').then((mod) => mod.ArtWorkComponent),
//   },
//   {
//     path: '**',
//     loadComponent: () =>
//       import('./picture-board/picture-board.component').then(
//         (mod) => mod.PictureBoardComponent
//       ),
//   }
// ];

export const routes: Routes = [
  { path: '', component: PictureBoardComponent },
  { path: 'explore', component: ExploreComponent },
  {
    path: `artwork/:id}`,
    loadComponent: () =>
      import('./art-work/art-work.component').then( (mod) => mod.ArtWorkComponent),
  },
];
