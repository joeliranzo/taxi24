import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Driver } from '../../domain/driver/driver.entity';
import { DriverRepository } from '../../domain/driver/driver.repository';

@Injectable()
export class PrismaDriverRepository implements DriverRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Driver[]> {
    return this.prisma.driver.findMany();
  }

  async findAvailable(): Promise<Driver[]> {
    return this.prisma.driver.findMany({ where: { isAvailable: true } });
  }

  async findNearby(lat: number, lng: number, radius: number): Promise<Driver[]> {
    // Haversine formula for 3km radius
    return this.prisma.$queryRawUnsafe(
      `SELECT *, (
        6371 * acos(
          cos(radians(${lat})) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(${lng})) +
          sin(radians(${lat})) * sin(radians(latitude))
        )
      ) AS distance
      FROM "Driver"
      WHERE isAvailable = true
      HAVING distance <= ${radius}
      ORDER BY distance ASC`
    );
  }

  async findById(id: string): Promise<Driver | null> {
    return this.prisma.driver.findUnique({ where: { id } });
  }

  async create(driver: Partial<Driver>): Promise<Driver> {
    return this.prisma.driver.create({ data: driver });
  }

  async update(id: string, driver: Partial<Driver>): Promise<Driver> {
    return this.prisma.driver.update({ where: { id }, data: driver });
  }
}
