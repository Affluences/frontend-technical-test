import { TimeSlot, Weekday } from '../../domain/opening-hours';
import { Site } from '../../domain/site';

const MINUTES_IN_HOUR = 60;

/** Indexed like `Date.getDay()`: 0 is Sunday. */
const WEEKDAYS_BY_DAY_INDEX: Weekday[] = [
    Weekday.Sunday,
    Weekday.Monday,
    Weekday.Tuesday,
    Weekday.Wednesday,
    Weekday.Thursday,
    Weekday.Friday,
    Weekday.Saturday,
];

const toMinutesSinceMidnight = (time: string): number => {
    const [hours, minutes] = time.split(':');
    return Number(hours) * MINUTES_IN_HOUR + Number(minutes);
};

const getMinutesSinceMidnight = (date: Date): number => date.getHours() * MINUTES_IN_HOUR + date.getMinutes();

const getWeekday = (date: Date): Weekday => {
    const weekday = WEEKDAYS_BY_DAY_INDEX[date.getDay()];
    if (weekday === undefined) {
        throw new Error('Illogical state: Date.getDay() always returns an index between 0 and 6');
    }
    return weekday;
};

const getPreviousDay = (date: Date): Date => {
    const previousDay = new Date(date);
    previousDay.setDate(date.getDate() - 1);
    return previousDay;
};

const endsAfterMidnight = ({ opensAt, closesAt }: TimeSlot): boolean =>
    toMinutesSinceMidnight(closesAt) <= toMinutesSinceMidnight(opensAt);

const isWithinSameDayPart = (timeSlot: TimeSlot, minutesSinceMidnight: number): boolean => {
    const opensAtInMinutes = toMinutesSinceMidnight(timeSlot.opensAt);
    const closesAtInMinutes = toMinutesSinceMidnight(timeSlot.closesAt);

    if (endsAfterMidnight(timeSlot)) {
        return minutesSinceMidnight >= opensAtInMinutes;
    }
    return minutesSinceMidnight >= opensAtInMinutes && minutesSinceMidnight < closesAtInMinutes;
};

const isWithinAfterMidnightPart = ({ closesAt }: TimeSlot, minutesSinceMidnight: number): boolean =>
    minutesSinceMidnight < toMinutesSinceMidnight(closesAt);

export const isSiteOpenAt = ({ openingHours }: Site, date: Date): boolean => {
    const minutesSinceMidnight = getMinutesSinceMidnight(date);

    const todayTimeSlots = openingHours[getWeekday(date)];
    const isOpenInTodayTimeSlot = todayTimeSlots.some((timeSlot) =>
        isWithinSameDayPart(timeSlot, minutesSinceMidnight)
    );

    const yesterdayTimeSlots = openingHours[getWeekday(getPreviousDay(date))];
    const yesterdayTimeSlotsEndingAfterMidnight = yesterdayTimeSlots.filter(endsAfterMidnight);
    const isOpenInYesterdayTimeSlot = yesterdayTimeSlotsEndingAfterMidnight.some((timeSlot) =>
        isWithinAfterMidnightPart(timeSlot, minutesSinceMidnight)
    );

    return isOpenInTodayTimeSlot || isOpenInYesterdayTimeSlot;
};

const formatTime = (time: string): string => time.replace(':', 'h');

export const getTodayOpeningHoursLabel = ({ openingHours }: Site, date: Date): string => {
    const todayTimeSlots = openingHours[getWeekday(date)];

    const isAlwaysOpen = todayTimeSlots.some(({ opensAt, closesAt }) => opensAt === '00:00' && closesAt === '00:00');
    if (isAlwaysOpen) {
        return 'Ouvert 24h/24';
    }

    const yesterdayTimeSlots = openingHours[getWeekday(getPreviousDay(date))];
    const yesterdayTimeSlotsEndingAfterMidnight = yesterdayTimeSlots.filter(endsAfterMidnight);
    const afterMidnightLabels = yesterdayTimeSlotsEndingAfterMidnight.map(
        ({ closesAt }) => `Jusqu'à ${formatTime(closesAt)}`
    );
    const todayLabels = todayTimeSlots.map(
        ({ opensAt, closesAt }) => `${formatTime(opensAt)} – ${formatTime(closesAt)}`
    );
    const timeSlotLabels = [...afterMidnightLabels, ...todayLabels];

    if (timeSlotLabels.length === 0) {
        return "Fermé aujourd'hui";
    }
    return timeSlotLabels.join(' · ');
};
