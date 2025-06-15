export class Trip {
  constructor(
    public readonly id: string,
    public driverId: string,
    public passengerId: string,
    public status: 'ACTIVE' | 'COMPLETED',
    public startLat: number,
    public startLng: number,
    public endLat?: number,
    public endLng?: number,
    public startedAt?: Date,
    public completedAt?: Date,
  ) {}
}
