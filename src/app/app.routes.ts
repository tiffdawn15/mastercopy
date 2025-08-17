import { Routes } from "@angular/router";
import { PictureBoardComponent } from "./picture-board/picture-board.component";
import { AboutComponent } from "./about/about.component";
import { ClientTestComponent } from "./client-test/client-test.component";
import { LoginButtonComponent } from "./login-button/login-button.component";

export const routes: Routes = [
  { path: "", component: PictureBoardComponent,
  },
  { path: "about", component: AboutComponent },
  { path: "client", component: ClientTestComponent },
  { path: "login", component: LoginButtonComponent },

  { path: '**', redirectTo: '' },
  {
    path: `artwork/:id`,
    loadComponent: () =>
      import("./art-work/art-work.component").then(
        (mod) => mod.ArtWorkComponent
      ),
  },
];
