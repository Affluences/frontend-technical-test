import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ClockService } from '../../../../core/clock/clock.service';
import { SitesRepository } from '../../../repositories/sites.repository';
import { DEFAULT_SITE_SORT, SITE_SORT_OPTIONS } from '../../constants/site-sort';
import { sortSites } from '../../utils/sort-sites.utils';
import { SiteCardComponent } from './site-card/site-card.component';

@Component({
    selector: 'app-sites-page',
    imports: [SiteCardComponent],
    templateUrl: './sites-page.component.html',
    styleUrl: './sites-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SitesPageComponent {
    private readonly sitesRepository = inject(SitesRepository);
    private readonly clockService = inject(ClockService);

    protected readonly sortOptions = SITE_SORT_OPTIONS;
    protected readonly selectedSort = signal(DEFAULT_SITE_SORT);
    protected readonly currentDate = this.clockService.currentDate;

    protected readonly sitesResource = rxResource({
        stream: () => this.sitesRepository.getSites$(),
        defaultValue: [],
    });

    protected readonly displayedSites = computed(() => {
        if (!this.sitesResource.hasValue()) {
            return [];
        }
        const sites = this.sitesResource.value();
        const selectedSort = this.selectedSort();
        return sortSites(sites, selectedSort);
    });

    protected handleChangeSort(selectedValue: string): void {
        const selectedOption = this.sortOptions.find(({ value }) => value === selectedValue);
        if (selectedOption === undefined) {
            throw new Error(`Illogical state: the sort select only contains known sorts, got "${selectedValue}"`);
        }
        this.selectedSort.set(selectedOption.value);
    }
}
