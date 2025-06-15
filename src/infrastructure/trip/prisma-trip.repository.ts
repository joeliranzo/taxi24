import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Trip } from '../../domain/trip/trip.entity';
import { TripRepository } from '../../domain/trip/trip.repository';

@Injectable()
export class PrismaTripRepository implements TripRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findActive(): Promise<Trip[]> {
    return this.prisma.trip.findMany({ where: { status: 'ACTIVE' } });
  }

  async create(trip: Partial<Trip>): Promise<Trip> {
    // Assign nearest available driver to passenger
    const driver = await this.prisma.driver.findFirst({ where: { isAvailable: true } });
    if (!driver) throw new Error('No available drivers');
    const createdTrip = await this.prisma.trip.create({
      data: {
        ...trip,
        driverId: driver.id,
        status: 'ACTIVE',
      },
    });
    await this.prisma.driver.update({ where: { id: driver.id }, data: { isAvailable: false } });
    return createdTrip;
  }

  async complete(tripId: string): Promise<Trip> {
    const trip = await this.prisma.trip.update({
      where: { id: tripId },
      data: { status: 'COMPLETED', completedAt: new Date() },
    });
    await this.prisma.driver.update({ where: { id: trip.driverId }, data: { isAvailable: true } });
    // Optionally, create invoice here
    await this.prisma.invoice.create({ data: { tripId: trip.id, amount: 20.0 } });
    return trip;
  }
}
