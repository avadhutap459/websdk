import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PREMIUM_API_URL } from 'customer-sdk';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    {
      provide: PREMIUM_API_URL,
      useValue: 'https://localhost:7126/api/Premium/calculate'
    },
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
