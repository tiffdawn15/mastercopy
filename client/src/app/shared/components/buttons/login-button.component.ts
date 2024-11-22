import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [],
  template: `
    <p>
    <button class="button__login" (click)="handleLogin()">Log In</button>
    </p>
  `
})
export class LoginButtonComponent {
  private auth = inject(AuthService);

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/artworks',
      },
    });
  }
}
