import { Site } from '../../domain/site';

/** Returns the occupancy rate between 0 and 1 (e.g. 0.42 for 42 %). */
export const getOccupancyRate = ({ occupancy, capacity }: Site): number => occupancy / capacity;
