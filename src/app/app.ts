import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    Header, 
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  searchQuery: string = "";

  constructor(private router: Router) {

  }
  protected readonly title = signal('master-copy');

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(["/search"], {
        queryParams: { q: this.searchQuery },
      });
    }
  }
}
