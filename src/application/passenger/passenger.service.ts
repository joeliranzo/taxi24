import { Injectable } from '@nestjs/common';
import { PassengerRepository } from '../../domain/passenger/passenger.repository';
import { PassengerDto } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(private readonly passengerRepo: PassengerRepository) {}

  async findAll(): Promise<PassengerDto[]> {
    return (await this.passengerRepo.findAll()) as PassengerDto[];
  }

  async findById(id: string): Promise<PassengerDto | null> {
    return (await this.passengerRepo.findById(id)) as PassengerDto;
  }

  async findNearestDrivers(passengerId: string, limit: number): Promise<any[]> {
    return this.passengerRepo.findNearestDrivers(passengerId, limit);
  }
}
