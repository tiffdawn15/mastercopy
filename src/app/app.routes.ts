import { Routes } from "@angular/router";
import { PictureBoardComponent } from "./picture-board/picture-board.component";
import { ExploreComponent } from "./explore/explore.component";
import { AboutComponent } from "./about/about.component";
import { ClientTestComponent } from "./client-test/client-test.component";

export const routes: Routes = [
  { path: "", component: PictureBoardComponent },

  { path: "explore", component: ExploreComponent },
  { path: "search", component: PictureBoardComponent },
  { path: "about", component: AboutComponent },
  { path: "client", component: ClientTestComponent },

  {
    path: `artwork/:id`,
    loadComponent: () =>
      import("./art-work/art-work.component").then(
        (mod) => mod.ArtWorkComponent
      ),
  },
];
