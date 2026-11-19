import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Site } from '../domain/site';
import { SiteAdapter } from './site.adapter';
import { SitesRepository } from '../domain/sites.repository';
import { SITES_MOCK } from './mocks/sites.mock';

const MOCK_HTTP_DELAY_MILLISECONDS = 1000;

@Injectable({ providedIn: 'root' })
export class MockSitesRepository extends SitesRepository {
    public override getSites$(): Observable<Site[]> {
        const siteDtos$ = of(SITES_MOCK).pipe(delay(MOCK_HTTP_DELAY_MILLISECONDS));

        return siteDtos$.pipe(map((siteDtos) => siteDtos.map((siteDto) => SiteAdapter.fromDto(siteDto))));
    }
}
