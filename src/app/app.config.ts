import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { SitesRepository } from './sites/domain/sites.repository';
import { MockSitesRepository } from './sites/repositories/mock-sites.repository';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(),
        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: SitesRepository,
            useClass: MockSitesRepository,
        }
    ],
};
