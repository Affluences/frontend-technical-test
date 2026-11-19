import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { mockApiInterceptor } from './core/mock-api/mock-api.interceptor';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withInterceptors([mockApiInterceptor])),
        { provide: LOCALE_ID, useValue: 'fr' },
    ],
};
