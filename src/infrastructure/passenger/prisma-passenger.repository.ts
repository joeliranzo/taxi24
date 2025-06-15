import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Passenger } from '../../domain/passenger/passenger.entity';
import { PassengerRepository } from '../../domain/passenger/passenger.repository';

@Injectable()
export class PrismaPassengerRepository implements PassengerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Passenger[]> {
    return this.prisma.passenger.findMany();
  }

  async findById(id: string): Promise<Passenger | null> {
    return this.prisma.passenger.findUnique({ where: { id } });
  }

  async findNearestDrivers(passengerId: string, limit: number): Promise<any[]> {
    const passenger = await this.prisma.passenger.findUnique({ where: { id: passengerId } });
    if (!passenger) return [];
    // Haversine formula for distance
    return this.prisma.$queryRawUnsafe(
      `SELECT *, (
        6371 * acos(
          cos(radians(${passenger.latitude})) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(${passenger.longitude})) +
          sin(radians(${passenger.latitude})) * sin(radians(latitude))
        )
      ) AS distance
      FROM driver
      WHERE is_available = true
      ORDER BY distance ASC
      LIMIT ${limit}`
    );
  }

  async create(passenger: { name: string; latitude: number; longitude: number }): Promise<Passenger> {
    return this.prisma.passenger.create({ data: {
      name: passenger.name,
      latitude: passenger.latitude,
      longitude: passenger.longitude,
    }});
  }

  async update(id: string, passenger: { name?: string; latitude?: number; longitude?: number }): Promise<Passenger> {
    return this.prisma.passenger.update({ where: { id }, data: passenger });
  }
}
