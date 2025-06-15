import { Controller, Get, Param, Query } from '@nestjs/common';
import { DriverService } from '../../application/driver/driver.service';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @Get('available')
  findAvailable() {
    return this.driverService.findAvailable();
  }

  @Get('nearby')
  findNearby(@Query('lat') lat: number, @Query('lng') lng: number, @Query('radius') radius = 3) {
    return this.driverService.findNearby(Number(lat), Number(lng), Number(radius));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.driverService.findById(id);
  }
}
