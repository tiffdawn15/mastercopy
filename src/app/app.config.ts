import { ApplicationConfig, inject, InjectionToken } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AppConfigService } from './app-config.service';


// Define an InjectionToken for REDIRECT_URI
export const REDIRECT_URI = new InjectionToken<string>('REDIRECT_URI', {
  providedIn: 'root',
  factory: () => {
    const appConfigService = inject(AppConfigService);
    console.log( appConfigService.getOrigin())
    return appConfigService.getOrigin();
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    {
      provide: 'REDIRECT_URI',
      useFactory: () => {
        const appConfigService = inject(AppConfigService); 
        return appConfigService.getOrigin();
      },
    },
    provideAuth0({
      domain: 'dev-fyfv8uggeoexkhf5.us.auth0.com',
      clientId: '5jqIWFTnCyHAyeMLvCYZYnb0H9HHIaMc',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200', 
      }
    }),
  ],
};

