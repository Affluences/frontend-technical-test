import { Injectable, signal } from '@angular/core';

const DEFAULT_HOURS = 14;
const DEFAULT_MINUTES = 30;

const buildDefaultDate = (): Date => {
    const date = new Date();
    date.setHours(DEFAULT_HOURS, DEFAULT_MINUTES, 0, 0);
    return date;
};

/**
 * Single source of truth for "now" in the app.
 * The date can be changed from the header, to check the app at any time of the week.
 */
@Injectable({ providedIn: 'root' })
export class ClockService {
    private readonly date = signal(buildDefaultDate());

    public readonly currentDate = this.date.asReadonly();

    public setCurrentDate(date: Date): void {
        this.date.set(date);
    }
}
