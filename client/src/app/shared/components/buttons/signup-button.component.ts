import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-signup-button',
  standalone: true,
  imports: [],
  template: `
 <button class="button__sign-up" (click)="handleSignUp()">Sign Up</button>

  `
})
export class SignupButtonComponent {
  private auth = inject(AuthService);

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: "/artworks",
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
}
