import { AuthService } from '@auth0/auth0-angular';
import { Component, DOCUMENT, EventEmitter, Inject, Output } from '@angular/core';
import { Image } from '../image';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  imports: [
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() searchEvent = new EventEmitter<string>();
  searchQuery: string = '';
  authenticated = false;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    private imageService: Image,
    private router: Router
  ) {
    auth.isAuthenticated$.forEach((each) => (this.authenticated = each));
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery },
      });
    }
  }

  login() {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirectUri: `${window.location.origin}/user`,
      },
    });

    this.router.navigate(['/user']);
  }
}
