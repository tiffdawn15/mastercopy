import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: "", component: BoardComponent },
    { path: "search", component: BoardComponent },
    { path: "about", component: AboutComponent },
    {
      path: `artwork/:id`,
      loadComponent: () =>
        import("./artwork/artwork.component").then(
          (mod) => mod.ArtworkComponent
        ),
    },
];
