import { Component } from '@angular/core';
import { AuthService, provideAuth0 } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      // TODO: SETUP ENV FILES 
  
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public auth: AuthService) {}
  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }
}
