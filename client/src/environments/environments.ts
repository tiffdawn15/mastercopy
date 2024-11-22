export const environment = {
    production: false,
    api: {
      serverUrl: 'undefined',
    },
    auth0: {
        domain: 'dev-lxvyzqp1stjc7ghi.us.auth0.com',
        clientId: 'bXNMNP0KuYSq1uRhGf2MFbQ6upupFVCn',
        authorizationParams: {
          redirect_uri: 'http://localhost:4200/callback',
        },
        errorPath: '/callback',
      },
  };
  