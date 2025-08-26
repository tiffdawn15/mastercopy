import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authHttpInterceptorFn]), withFetch()),
    provideAuth0({
      // The domain and clientId were configured in the previous chapter
      domain: 'dev-fyfv8uggeoexkhf5.us.auth0.com',
      clientId: '5jqIWFTnCyHAyeMLvCYZYnb0H9HHIaMc',
    
      authorizationParams: {
        redirect_uri: window.location.origin,
        
        // Request this audience at user authentication time
        audience: 'https://dev-fyfv8uggeoexkhf5.us.auth0.com/api/v2/',
    
        // Request this scope at user authentication time
        scope: 'read:current_user',
      },
    
      // Specify configuration for the interceptor              
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-fyfv8uggeoexkhf5.us.auth0.com/api/v2/' (note the asterisk)
            uri: 'https://dev-fyfv8uggeoexkhf5.us.auth0.com/api/v2/*',
            tokenOptions: {
              authorizationParams: {
                // The attached token should target this audience
                audience: 'https://dev-fyfv8uggeoexkhf5.us.auth0.com/api/v2/',
    
                // The attached token should have these scopes
                scope: 'read:current_user'
              }
            }
          }
        ]
      }
    })
        

  ],
};
