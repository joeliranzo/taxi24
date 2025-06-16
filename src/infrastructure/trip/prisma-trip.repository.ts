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

  async create(trip: { driverId: string; passengerId: string; startLat: number; startLng: number; status?: 'ACTIVE' | 'COMPLETED'; endLat?: number; endLng?: number; startedAt?: Date; completedAt?: Date }): Promise<Trip> {
    // Assign nearest available driver to passenger if not provided
    let driverId = trip.driverId;
    if (!driverId) {
      const driver = await this.prisma.driver.findFirst({ where: { isAvailable: true } });
      if (!driver) throw new Error('No available drivers');
      driverId = driver.id;
      await this.prisma.driver.update({ where: { id: driverId }, data: { isAvailable: false } });
    }
    const createdTrip = await this.prisma.trip.create({
      data: {
        driverId,
        passengerId: trip.passengerId,
        startLat: trip.startLat,
        startLng: trip.startLng,
        status: trip.status ?? 'ACTIVE',
        endLat: trip.endLat,
        endLng: trip.endLng,
        startedAt: trip.startedAt,
        completedAt: trip.completedAt,
      },
    });
    return createdTrip;
  }

  async complete(tripId: string, update?: { endLat?: number; endLng?: number; status?: 'ACTIVE' | 'COMPLETED'; completedAt?: Date }): Promise<Trip> {
    const existing = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!existing) {
      throw new Error('Trip not found');
    }
    const trip = await this.prisma.trip.update({
      where: { id: tripId },
      data: {
        status: update?.status ?? 'COMPLETED',
        completedAt: update?.completedAt ?? new Date(),
        endLat: update?.endLat,
        endLng: update?.endLng,
      },
    });
    await this.prisma.driver.update({ where: { id: trip.driverId }, data: { isAvailable: true } });
    // Optionally, create invoice here
    await this.prisma.invoice.create({ data: { tripId: trip.id, amount: 20.0 } });
    return trip;
  }
}
