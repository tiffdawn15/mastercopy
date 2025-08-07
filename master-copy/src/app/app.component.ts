import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet,
        HeaderComponent,
        RouterModule,
        RouterLink,
        RouterLinkActive,
    ],
    standalone: true, 
    templateUrl: './app.component.scss',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Mumbos-Big-Jumbo';
  searchQuery: string = '';

  constructor( private router: Router) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery },
      });
    }
  }
}
