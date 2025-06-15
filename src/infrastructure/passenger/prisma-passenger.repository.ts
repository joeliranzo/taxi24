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
      FROM "Driver"
      WHERE isAvailable = true
      ORDER BY distance ASC
      LIMIT ${limit}`
    );
  }

  async create(passenger: Partial<Passenger>): Promise<Passenger> {
    return this.prisma.passenger.create({ data: passenger });
  }

  async update(id: string, passenger: Partial<Passenger>): Promise<Passenger> {
    return this.prisma.passenger.update({ where: { id }, data: passenger });
  }
}
