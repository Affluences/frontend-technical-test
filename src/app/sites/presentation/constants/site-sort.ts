export enum SiteSort {
    NameAsc = 'NAME_ASC',
    OccupancyRateAsc = 'OCCUPANCY_RATE_ASC',
    OccupancyRateDesc = 'OCCUPANCY_RATE_DESC',
}

export interface SiteSortOption {
    value: SiteSort;
    label: string;
}

export const SITE_SORT_OPTIONS: SiteSortOption[] = [
    { value: SiteSort.NameAsc, label: 'Nom (A → Z)' },
    { value: SiteSort.OccupancyRateAsc, label: "Les moins fréquentés d'abord" },
    { value: SiteSort.OccupancyRateDesc, label: "Les plus fréquentés d'abord" },
];

export const DEFAULT_SITE_SORT = SiteSort.NameAsc;
