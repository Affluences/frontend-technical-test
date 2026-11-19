import { PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Site } from '../../../../domain/site';
import { SITE_CATEGORY_DISPLAYS } from '../../../constants/site-category-display';
import { getTodayOpeningHoursLabel, isSiteOpenAt } from '../../../utils/opening-hours.utils';
import { getOccupancyRate } from '../../../utils/occupancy.utils';

@Component({
    selector: 'app-site-card',
    imports: [PercentPipe],
    templateUrl: './site-card.component.html',
    styleUrl: './site-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteCardComponent {
    public readonly site = input.required<Site>();
    public readonly currentDate = input.required<Date>();

    protected readonly categoryDisplay = computed(() => SITE_CATEGORY_DISPLAYS[this.site().category]);
    protected readonly occupancyRate = computed(() => getOccupancyRate(this.site()));

    protected readonly isOpen = computed(() => {
        const site = this.site();
        const currentDate = this.currentDate();
        return isSiteOpenAt(site, currentDate);
    });

    protected readonly todayOpeningHoursLabel = computed(() => {
        const site = this.site();
        const currentDate = this.currentDate();
        return getTodayOpeningHoursLabel(site, currentDate);
    });
}
