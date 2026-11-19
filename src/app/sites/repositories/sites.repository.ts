import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Site } from '../domain/site';
import { SiteAdapter } from './site.adapter';
import { SiteDto } from './site.dto';

@Injectable({ providedIn: 'root' })
export class SitesRepository {
    private readonly httpClient = inject(HttpClient);

    public getSites$(): Observable<Site[]> {
        const siteDtos$ = this.httpClient.get<SiteDto[]>('/api/sites');

        return siteDtos$.pipe(map((siteDtos) => siteDtos.map((siteDto) => SiteAdapter.fromDto(siteDto))));
    }
}
