import { Trip } from './trip.entity';
import { UpdateTripDto } from '../../application/trip/dto/trip-action.dto';

export interface TripRepository {
  findActive(): Promise<Trip[]>;
  create(trip: Partial<Trip>): Promise<Trip>;
  complete(tripId: string, update?: UpdateTripDto): Promise<Trip>;
}
