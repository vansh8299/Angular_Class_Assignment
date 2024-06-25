import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InmemorywebapiService } from './inmemorywebapi.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      // Configure the HttpClientInMemoryWebApiModule with the InmemorywebapiService
      HttpClientInMemoryWebApiModule.forRoot(InmemorywebapiService, {
        dataEncapsulation: false, // Disable data encapsulation
      })
    ),
    provideRouter(routes), provideAnimationsAsync(),
  ],
};
