import { Component } from "@angular/core";
import {
  Router,
  RouterOutlet,
} from "@angular/router";
import { HeaderComponent } from "./header/header.component";

@Component({
    selector: "app-root",
    imports: [
        RouterOutlet,
        HeaderComponent
    ],
    standalone: true,
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css"
})
export class AppComponent {

  title = "Mumbos-Big-Jumbo";
  searchQuery: string = "";

  constructor(private router: Router) {

  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(["/search"], {
        queryParams: { q: this.searchQuery },
      });
    }
  }
}
