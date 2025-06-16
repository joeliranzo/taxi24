import { Inject, Injectable } from '@nestjs/common';
import { TripRepository } from '../../domain/trip/trip.repository';
import { TripDto } from './dto/trip.dto';
import { CreateTripDto, UpdateTripDto } from './dto/trip-action.dto';

@Injectable()
export class TripService {
  constructor(@Inject('TripRepository') private readonly tripRepo: TripRepository) {}

  async findActive(): Promise<TripDto[]> {
    return (await this.tripRepo.findActive()) as TripDto[];
  }

  async create(trip: CreateTripDto): Promise<TripDto> {
    return (await this.tripRepo.create(trip)) as TripDto;
  }

  async complete(tripId: string, update: UpdateTripDto): Promise<TripDto> {
    return (await this.tripRepo.complete(tripId, update)) as TripDto;
  }
}
