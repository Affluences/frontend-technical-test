export enum Weekday {
    Monday = 'MONDAY',
    Tuesday = 'TUESDAY',
    Wednesday = 'WEDNESDAY',
    Thursday = 'THURSDAY',
    Friday = 'FRIDAY',
    Saturday = 'SATURDAY',
    Sunday = 'SUNDAY',
}

/**
 * Times are 'HH:mm' strings in the site's local time.
 * When `closesAt` is earlier than or equal to `opensAt`, the slot ends after midnight (e.g. 20:00 → 02:00).
 */
export interface TimeSlot {
    opensAt: string;
    closesAt: string;
}

export type WeeklyOpeningHours = Record<Weekday, TimeSlot[]>;
