import { TimeSlot, WeeklyOpeningHours } from '../../domain/opening-hours';
import { Site, SiteCategory } from '../../domain/site';
import { getTodayOpeningHoursLabel, isSiteOpenAt } from './opening-hours.utils';

const buildSite = (openingHours: Partial<WeeklyOpeningHours>): Site => ({
    id: 1,
    name: 'Bibliothèque',
    city: 'Paris',
    category: SiteCategory.Library,
    capacity: 100,
    occupancy: 10,
    openingHours: {
        MONDAY: [],
        TUESDAY: [],
        WEDNESDAY: [],
        THURSDAY: [],
        FRIDAY: [],
        SATURDAY: [],
        SUNDAY: [],
        ...openingHours,
    },
});

const slot = (opensAt: string, closesAt: string): TimeSlot => ({ opensAt, closesAt });

// 2026-11-17 is a Tuesday.
const tuesdayAt = (hours: number, minutes = 0): Date => new Date(2026, 10, 17, hours, minutes);
const wednesdayAt = (hours: number, minutes = 0): Date => new Date(2026, 10, 18, hours, minutes);

describe('isSiteOpenAt', () => {
    const site = buildSite({ TUESDAY: [slot('10:00', '12:30'), slot('14:00', '18:30')] });

    it('is open during a time slot', () => {
        expect(isSiteOpenAt(site, tuesdayAt(11))).toBe(true);
        expect(isSiteOpenAt(site, tuesdayAt(14))).toBe(true);
    });

    it('is closed between two time slots', () => {
        expect(isSiteOpenAt(site, tuesdayAt(13))).toBe(false);
    });

    it('is closed at the closing time', () => {
        expect(isSiteOpenAt(site, tuesdayAt(18, 30))).toBe(false);
    });

    it('is closed on a day without time slots', () => {
        expect(isSiteOpenAt(site, wednesdayAt(11))).toBe(false);
    });

    it('handles time slots ending after midnight', () => {
        const lateNightSite = buildSite({ TUESDAY: [slot('08:00', '02:00')] });

        expect(isSiteOpenAt(lateNightSite, tuesdayAt(23))).toBe(true);
        expect(isSiteOpenAt(lateNightSite, wednesdayAt(1))).toBe(true);
        expect(isSiteOpenAt(lateNightSite, wednesdayAt(3))).toBe(false);
    });

    it('handles sites open 24 hours a day', () => {
        const alwaysOpenSite = buildSite({ TUESDAY: [slot('00:00', '00:00')] });

        expect(isSiteOpenAt(alwaysOpenSite, tuesdayAt(0))).toBe(true);
        expect(isSiteOpenAt(alwaysOpenSite, tuesdayAt(23, 59))).toBe(true);
    });
});

describe('getTodayOpeningHoursLabel', () => {
    it('lists the time slots of the day', () => {
        const site = buildSite({ TUESDAY: [slot('10:00', '12:30'), slot('14:00', '18:30')] });

        expect(getTodayOpeningHoursLabel(site, tuesdayAt(9))).toBe('10h00 – 12h30 · 14h00 – 18h30');
    });

    it('says when the site is closed all day', () => {
        const site = buildSite({});

        expect(getTodayOpeningHoursLabel(site, tuesdayAt(9))).toBe("Fermé aujourd'hui");
    });

    it('includes the end of a time slot that started the day before', () => {
        const site = buildSite({ MONDAY: [slot('08:00', '02:00')], TUESDAY: [slot('08:00', '02:00')] });

        expect(getTodayOpeningHoursLabel(site, tuesdayAt(1))).toBe("Jusqu'à 02h00 · 08h00 – 02h00");
        expect(getTodayOpeningHoursLabel(site, wednesdayAt(1))).toBe("Jusqu'à 02h00");
    });

    it('says when the site is open 24 hours a day', () => {
        const site = buildSite({ TUESDAY: [slot('00:00', '00:00')] });

        expect(getTodayOpeningHoursLabel(site, tuesdayAt(9))).toBe('Ouvert 24h/24');
    });
});
