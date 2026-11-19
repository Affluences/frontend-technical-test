import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { SITES_MOCK } from './sites.mock';

const MOCK_LATENCY_IN_MS = 600;

/**
 * There is no backend in this project: this interceptor answers the API calls with mocked data,
 * as a real API would do (same URL, same JSON body, with some latency).
 */
export const mockApiInterceptor: HttpInterceptorFn = (request, next) => {
    const isGetSitesRequest = request.method === 'GET' && request.url === '/api/sites';

    if (!isGetSitesRequest) {
        return next(request);
    }

    const response = new HttpResponse({ status: 200, body: structuredClone(SITES_MOCK) });

    return of(response).pipe(delay(MOCK_LATENCY_IN_MS));
};
