import { ApiProperty } from '@nestjs/swagger';

export class TripDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  driverId: string;

  @ApiProperty()
  passengerId: string;

  @ApiProperty({ enum: ['ACTIVE', 'COMPLETED'] })
  status: 'ACTIVE' | 'COMPLETED';

  @ApiProperty()
  startLat: number;

  @ApiProperty()
  startLng: number;

  @ApiProperty({ required: false })
  endLat?: number;

  @ApiProperty({ required: false })
  endLng?: number;

  @ApiProperty({ required: false })
  startedAt?: Date;

  @ApiProperty({ required: false })
  completedAt?: Date;
}
