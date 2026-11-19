import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ClockService } from '../../clock/clock.service';
import { fromDateTimeLocalValue, toDateTimeLocalValue } from './date-time-local.utils';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrl: './app-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
    private readonly clockService = inject(ClockService);

    protected readonly currentDateValue = computed(() => toDateTimeLocalValue(this.clockService.currentDate()));

    protected handleChangeCurrentDate(value: string): void {
        const date = fromDateTimeLocalValue(value);
        if (date === null) {
            return;
        }
        this.clockService.setCurrentDate(date);
    }
}
