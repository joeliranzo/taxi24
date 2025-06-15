import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Drivers
  await prisma.driver.createMany({
    data: [
      { name: 'Alice Driver', latitude: 40.7128, longitude: -74.0060 },
      { name: 'Bob Driver', latitude: 40.7138, longitude: -74.0050 },
      { name: 'Charlie Driver', latitude: 40.7148, longitude: -74.0040 },
      { name: 'Diana Driver', latitude: 40.7158, longitude: -74.0030, isAvailable: false },
    ],
  });

  // Seed Passengers
  await prisma.passenger.createMany({
    data: [
      { name: 'Eve Passenger', latitude: 40.7120, longitude: -74.0020 },
      { name: 'Frank Passenger', latitude: 40.7160, longitude: -74.0080 },
    ],
  });

  // Seed Trips (one active, one completed)
  const [driver1, driver2] = await prisma.driver.findMany({ take: 2 });
  const [passenger1, passenger2] = await prisma.passenger.findMany({ take: 2 });

  const trip1 = await prisma.trip.create({
    data: {
      driverId: driver1.id,
      passengerId: passenger1.id,
      status: 'ACTIVE',
      startLat: 40.7120,
      startLng: -74.0020,
    },
  });

  const trip2 = await prisma.trip.create({
    data: {
      driverId: driver2.id,
      passengerId: passenger2.id,
      status: 'COMPLETED',
      startLat: 40.7160,
      startLng: -74.0080,
      endLat: 40.7200,
      endLng: -74.0100,
      completedAt: new Date(),
    },
  });

  // Seed Invoice for completed trip
  await prisma.invoice.create({
    data: {
      tripId: trip2.id,
      amount: 15.5,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
