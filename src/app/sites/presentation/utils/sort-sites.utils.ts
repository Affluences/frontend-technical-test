import { Site } from '../../domain/site';
import { SiteSort } from '../constants/site-sort';

const compareByName = (siteA: Site, siteB: Site): number => siteA.name.localeCompare(siteB.name, 'fr');

const compareByOccupancyRate = (siteA: Site, siteB: Site): number => siteA.occupancy - siteB.occupancy;

export const sortSites = (sites: Site[], sort: SiteSort): Site[] => {
    const sortedSites = [...sites];

    switch (sort) {
        case SiteSort.NameAsc:
            return sortedSites.sort(compareByName);
        case SiteSort.OccupancyRateAsc:
            return sortedSites.sort(compareByOccupancyRate);
        case SiteSort.OccupancyRateDesc:
            return sortedSites.sort((siteA, siteB) => compareByOccupancyRate(siteB, siteA));
    }
};
