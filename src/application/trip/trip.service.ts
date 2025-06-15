import { Injectable } from '@nestjs/common';
import { TripRepository } from '../../domain/trip/trip.repository';
import { TripDto } from './dto/trip.dto';

@Injectable()
export class TripService {
  constructor(private readonly tripRepo: TripRepository) {}

  async findActive(): Promise<TripDto[]> {
    return (await this.tripRepo.findActive()) as TripDto[];
  }

  async create(trip: Partial<TripDto>): Promise<TripDto> {
    return (await this.tripRepo.create(trip)) as TripDto;
  }

  async complete(tripId: string): Promise<TripDto> {
    return (await this.tripRepo.complete(tripId)) as TripDto;
  }
}
