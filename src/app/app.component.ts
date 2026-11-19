import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppHeaderComponent } from './core/layout/app-header/app-header.component';
import { SitesPageComponent } from './sites/presentation/components/sites-page/sites-page.component';

@Component({
    selector: 'app-root',
    imports: [AppHeaderComponent, SitesPageComponent],
    template: `
        <app-header />
        <main>
            <app-sites-page />
        </main>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
