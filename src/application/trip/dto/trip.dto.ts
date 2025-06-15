export class TripDto {
  id: string;
  driverId: string;
  passengerId: string;
  status: 'ACTIVE' | 'COMPLETED';
  startLat: number;
  startLng: number;
  endLat?: number;
  endLng?: number;
  startedAt?: Date;
  completedAt?: Date;
}
