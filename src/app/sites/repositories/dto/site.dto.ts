export type SiteCategoryDto = 'LIBRARY' | 'UNIVERSITY_LIBRARY' | 'STUDY_ROOM';

export type WeekdayDto = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface TimeSlotDto {
    opens_at: string;
    closes_at: string;
}

export type OpeningHoursDto = Record<WeekdayDto, TimeSlotDto[]>;

export interface SiteDto {
    id: number;
    name: string;
    city: string;
    category: SiteCategoryDto;
    capacity: number;
    /** `null` when the sensors of the site are offline. */
    current_occupancy: number | null;
    opening_hours: OpeningHoursDto;
}
