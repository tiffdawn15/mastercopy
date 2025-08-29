import { Routes } from '@angular/router';
import { About } from './about/about';
import { Board } from './board/board';
import { User} from './user/user.js'
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    { path: "", component: Board},
    { path: "about", component: About },
    { path: "user", component: User, 
      canActivate: [AuthGuard],
    },
    {
      path: `artwork/:id`,
      loadComponent: () =>
        import("./artwork/artwork.js").then(
          (mod) => mod.Artwork
        ),
    },
    { path: '**', redirectTo: '' },
];
