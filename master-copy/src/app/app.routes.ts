import { Routes } from '@angular/router';
import { About } from './about/about';
import { Board } from './board/board';

export const routes: Routes = [
    { path: "", component: Board,
    },
    { path: "about", component: About },
    // { path: "login", component: LoginButtonComponent },
  
    { path: '**', redirectTo: '' },
    {
      path: `artwork/:id`,
      loadComponent: () =>
        import("./artwork/artwork.js").then(
          (mod) => mod.Artwork
        ),
    },
];
