import { SiteCategory } from '../../domain/site';

export interface SiteCategoryDisplay {
    label: string;
    /** Name of a Material Symbols icon: https://fonts.google.com/icons */
    icon: string;
}

export const SITE_CATEGORY_DISPLAYS: Record<SiteCategory, SiteCategoryDisplay> = {
    [SiteCategory.Library]: { label: 'Bibliothèque', icon: 'local_library' },
    [SiteCategory.UniversityLibrary]: { label: 'Bibliothèque universitaire', icon: 'school' },
    [SiteCategory.StudyRoom]: { label: "Salle d'étude", icon: 'menu_book' },
};
