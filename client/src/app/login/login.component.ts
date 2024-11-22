import { Component, inject } from '@angular/core';
import { AuthService, provideAuth0 } from '@auth0/auth0-angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
  HeaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private auth = inject(AuthService);

  constructor() {}

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }


  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/profile',
      },
    });
  }
}
