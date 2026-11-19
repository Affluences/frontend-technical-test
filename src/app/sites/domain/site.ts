import { WeeklyOpeningHours } from './opening-hours';

export enum SiteCategory {
    Library = 'LIBRARY',
    UniversityLibrary = 'UNIVERSITY_LIBRARY',
    StudyRoom = 'STUDY_ROOM',
}

export interface Site {
    id: number;
    name: string;
    city: string;
    category: SiteCategory;
    /** Maximum number of people allowed in the site at the same time. */
    capacity: number;
    /** Number of people currently in the site, as measured by the sensors. */
    occupancy: number;
    openingHours: WeeklyOpeningHours;
}
