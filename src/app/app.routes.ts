import { Routes } from '@angular/router';
import { About } from './about/about';
import { Board } from './board/board';
import { User} from './user/user.js'
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: "about", component: About },
  {
    path: "user",
    loadComponent: () =>
      import("./user/user.js").then((mod) => mod.User),
    canActivate: [AuthGuard],
  },
  {
    path: "artwork/:id",
    loadComponent: () =>
      import("./artwork/artwork.js").then(
        (mod) => mod.Artwork
      ),
  },
  { path: "", component: Board },
  { path: '**', redirectTo: '' },
];
