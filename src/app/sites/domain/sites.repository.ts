import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from './site';

@Injectable()
export abstract class SitesRepository {
    public abstract getSites$(): Observable<Site[]>;
}
