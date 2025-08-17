import { catchError, of } from 'rxjs';
import { Component, Inject, PLATFORM_ID, afterNextRender, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-login-button',
    imports: [],
    standalone: true,
    templateUrl: './login-button.component.html',
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
        this.isHydrated.set(true);
      });
    }
  }

  login() {
    if (this.isBrowser && this.isHydrated()) {
      this.auth.loginWithRedirect().pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return of(null); 
        })
      ).subscribe({
        next: () => console.log('Login initiated'),
        error: (err) => console.error('Login error:', err)
      });
    }
  }
}
