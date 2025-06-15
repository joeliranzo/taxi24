import { Injectable } from '@nestjs/common';
import { DriverRepository } from '../../domain/driver/driver.repository';
import { DriverDto } from './dto/driver.dto';

@Injectable()
export class DriverService {
  constructor(private readonly driverRepo: DriverRepository) {}

  async findAll(): Promise<DriverDto[]> {
    return (await this.driverRepo.findAll()) as DriverDto[];
  }

  async findAvailable(): Promise<DriverDto[]> {
    return (await this.driverRepo.findAvailable()) as DriverDto[];
  }

  async findNearby(lat: number, lng: number, radius: number): Promise<DriverDto[]> {
    return (await this.driverRepo.findNearby(lat, lng, radius)) as DriverDto[];
  }

  async findById(id: string): Promise<DriverDto | null> {
    return (await this.driverRepo.findById(id)) as DriverDto;
  }
}
