import { Site, SiteCategory } from '../../domain/site';
import { SiteSort } from '../constants/site-sort';
import { sortSites } from './sort-sites.utils';

const buildSite = (site: Pick<Site, 'id' | 'name' | 'capacity' | 'occupancy'>): Site => ({
    city: 'Paris',
    category: SiteCategory.Library,
    openingHours: {
        MONDAY: [],
        TUESDAY: [],
        WEDNESDAY: [],
        THURSDAY: [],
        FRIDAY: [],
        SATURDAY: [],
        SUNDAY: [],
    },
    ...site,
});

const getIds = (sites: Site[]): number[] => sites.map(({ id }) => id);

describe('sortSites', () => {
    const quietSite = buildSite({ id: 1, name: 'Bibliothèque Calme', capacity: 100, occupancy: 10 });
    const busySite = buildSite({ id: 2, name: 'Archives Bondées', capacity: 100, occupancy: 90 });
    const averageSite = buildSite({ id: 3, name: 'Médiathèque Moyenne', capacity: 100, occupancy: 50 });
    const sites = [quietSite, busySite, averageSite];

    it('sorts the sites by name', () => {
        const sortedSites = sortSites(sites, SiteSort.NameAsc);

        expect(getIds(sortedSites)).toEqual([2, 1, 3]);
    });

    it('sorts the sites from the least to the most crowded', () => {
        const sortedSites = sortSites(sites, SiteSort.OccupancyRateAsc);

        expect(getIds(sortedSites)).toEqual([1, 3, 2]);
    });

    it('sorts the sites from the most to the least crowded', () => {
        const sortedSites = sortSites(sites, SiteSort.OccupancyRateDesc);

        expect(getIds(sortedSites)).toEqual([2, 3, 1]);
    });

    it('does not modify the given list', () => {
        sortSites(sites, SiteSort.OccupancyRateAsc);

        expect(getIds(sites)).toEqual([1, 2, 3]);
    });
});
