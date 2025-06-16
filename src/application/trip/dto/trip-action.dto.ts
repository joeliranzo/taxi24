import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ description: 'ID del conductor (opcional, si no se provee se asigna el más cercano disponible)', required: false })
  driverId?: string;
  @ApiProperty({ description: 'ID del pasajero' })
  passengerId: string;
  @ApiProperty({ description: 'Latitud de inicio' })
  startLat: number;
  @ApiProperty({ description: 'Longitud de inicio' })
  startLng: number;
}

export class UpdateTripDto {
  @ApiPropertyOptional({ description: 'Latitud de destino' })
  endLat?: number;
  @ApiPropertyOptional({ description: 'Longitud de destino' })
  endLng?: number;
  @ApiPropertyOptional({ description: 'Estado del viaje (ACTIVE o COMPLETED)' })
  status?: 'ACTIVE' | 'COMPLETED';
  @ApiPropertyOptional({ description: 'Fecha de finalización' })
  completedAt?: Date;
}
