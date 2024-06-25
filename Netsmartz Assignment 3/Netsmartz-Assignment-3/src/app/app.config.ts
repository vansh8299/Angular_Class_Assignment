import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InmemorywebapiService } from './inmemorywebapi.service';

// Configuration for the Angular application
export const appConfig: ApplicationConfig = {
  providers: [
    // Provide HttpClient for making HTTP requests
    provideHttpClient(),

    // Import providers from the HttpClientInMemoryWebApiModule
    importProvidersFrom(
      // Configure the HttpClientInMemoryWebApiModule with the InmemorywebapiService
      HttpClientInMemoryWebApiModule.forRoot(InmemorywebapiService, {
        dataEncapsulation: false, // Disable data encapsulation
      })
    ),

    // Provide the router with the defined routes
    provideRouter(routes),
  ],
};
