import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0, authHttpInterceptorFn } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAuth0(),

      provideHttpClient(withInterceptors([authHttpInterceptorFn])),
      provideAuth0({
        domain: 'dev-lxvyzqp1stjc7ghi.us.auth0.com',
        clientId: 'bXNMNP0KuYSq1uRhGf2MFbQ6upupFVCn',
      
      })

      
  
  ],
};
