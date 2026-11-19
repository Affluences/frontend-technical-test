import { TimeSlot, Weekday, WeeklyOpeningHours } from '../domain/opening-hours';
import { TimeSlotDto, WeekdayDto } from './site.dto';

export class WeeklyOpeningHoursAdapter {
    public static fromDto(openingHoursDto: Record<WeekdayDto, TimeSlotDto[]>): WeeklyOpeningHours {
        return {
            [Weekday.Monday]: WeeklyOpeningHoursAdapter.fromTimeSlotDtos(openingHoursDto.monday),
            [Weekday.Tuesday]: WeeklyOpeningHoursAdapter.fromTimeSlotDtos(openingHoursDto.tuesday),
            [Weekday.Wednesday]: WeeklyOpeningHoursAdapter.fromTimeSlotDtos(openingHoursDto.wednesday),
            [Weekday.Thursday]: WeeklyOpeningHoursAdapter.fromTimeSlotDtos(openingHoursDto.thursday),
            [Weekday.Friday]: WeeklyOpeningHoursAdapter.fromTimeSlotDtos(openingHoursDto.friday),
            [Weekday.Saturday]: WeeklyOpeningHoursAdapter.fromTimeSlotDtos(openingHoursDto.saturday),
            [Weekday.Sunday]: WeeklyOpeningHoursAdapter.fromTimeSlotDtos(openingHoursDto.sunday),
        };
    }

    private static fromTimeSlotDtos(timeSlotDtos: TimeSlotDto[]): TimeSlot[] {
        return timeSlotDtos.map(({ opens_at, closes_at }) => ({ opensAt: opens_at, closesAt: closes_at }));
    }
}
