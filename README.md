# MasterCopy
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_BADGE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_PROJECT_NAME/deploys)

MasterCopy is a modern web application built with Angular, designed to provide a seamless user experience for managing and exploring artworks. This project leverages the Angular CLI for efficient development and includes a variety of components to ensure scalability and maintainability.

---
## Features

- **Dynamic User Interface**: Built with Angular Material for a responsive and visually appealing design.
- **Authentication**: Secure user authentication and profile management.
- **Routing**: Modular routing for easy navigation between different sections of the application.
- **Reusable Components**: Modular and reusable components for better code organization.
- **Real-time Updates**: Automatic reloading during development for a smooth workflow.

---

## Components Overview

### 1. **User Component**
   - Displays user-specific information such as saved artworks and profile details.
   - Includes a call-to-action button to start browsing artworks.

### 2. **Artworks Component**
   - Lists available artworks with options to filter and sort.
   - Provides detailed views for individual artworks.

### 3. **Authentication Module**
   - Handles user login, registration, and logout functionality.
   - Integrates with third-party authentication providers if needed.

### 4. **Shared Module**
   - Contains reusable components like buttons, cards, and utility directives.
   - Ensures consistency across the application.

### 5. **Routing Module**
   - Manages navigation between different views.
   - Implements lazy loading for better performance.

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
