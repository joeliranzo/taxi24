import { Passenger } from './passenger.entity';

export interface PassengerRepository {
  findAll(): Promise<Passenger[]>;
  findById(id: string): Promise<Passenger | null>;
  findNearestDrivers(passengerId: string, limit: number): Promise<any[]>;
  create(passenger: Partial<Passenger>): Promise<Passenger>;
  update(id: string, passenger: Partial<Passenger>): Promise<Passenger>;
}
