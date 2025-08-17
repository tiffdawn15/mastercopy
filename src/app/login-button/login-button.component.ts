import { Component, Inject, PLATFORM_ID, afterNextRender, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [],
  template: `
    <p>login-button works!</p>
    <button 
      (click)="login()" 
      [disabled]="!isHydrated()"
      [class.opacity-50]="!isHydrated()">
      {{ isHydrated() ? 'Log in' : 'Loading...' }}
    </button>
    
    @if (!isHydrated()) {
      <p class="text-sm text-gray-500">Initializing authentication...</p>
    }
  `,
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent {
  private isBrowser: boolean;
  public isHydrated = signal(false);

  constructor(
    private auth: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      afterNextRender(() => {
        // Mark as hydrated after the component is rendered in the browser
        this.isHydrated.set(true);
        console.log('Component hydrated and ready for interaction');
      });
    }
  }

  login() {
    if (this.isBrowser && this.isHydrated()) {
      this.auth.loginWithRedirect().subscribe({
        next: () => console.log('Login initiated'),
        error: (err) => console.error('Login error:', err)
      });
    }
  }
}
