import { Site, SiteCategory } from '../domain/site';
import { SiteCategoryDto, SiteDto } from './site.dto';
import { WeeklyOpeningHoursAdapter } from './weekly-opening-hours.adapter';

const SITE_CATEGORY_BY_DTO: Record<SiteCategoryDto, SiteCategory> = {
    LIBRARY: SiteCategory.Library,
    UNIVERSITY_LIBRARY: SiteCategory.UniversityLibrary,
    STUDY_ROOM: SiteCategory.StudyRoom,
};

export class SiteAdapter {
    public static fromDto(siteDto: SiteDto): Site {
        return {
            id: siteDto.id,
            name: siteDto.name,
            city: siteDto.city,
            category: SITE_CATEGORY_BY_DTO[siteDto.category],
            capacity: siteDto.capacity,
            occupancy: siteDto.current_occupancy ?? 0,
            openingHours: WeeklyOpeningHoursAdapter.fromDto(siteDto.opening_hours),
        };
    }
}
