import { Trip } from './trip.entity';

export interface TripRepository {
  findActive(): Promise<Trip[]>;
  create(trip: Partial<Trip>): Promise<Trip>;
  complete(tripId: string): Promise<Trip>;
}
