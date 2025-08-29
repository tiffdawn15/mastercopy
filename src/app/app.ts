import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    Header, 
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  searchQuery: string = "";

  constructor(private router: Router, private auth: AuthService) {

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
