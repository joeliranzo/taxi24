import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DriverService } from '../../application/driver/driver.service';
import { DriverDto } from '../../application/driver/dto/driver.dto';

@ApiTags('drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  @ApiOperation({ summary: 'List all drivers' })
  @ApiResponse({ status: 200, type: [DriverDto] })
  findAll() {
    return this.driverService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'List available drivers' })
  @ApiResponse({ status: 200, type: [DriverDto] })
  findAvailable() {
    return this.driverService.findAvailable();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'List available drivers within a radius of a location' })
  @ApiQuery({ name: 'lat', type: Number })
  @ApiQuery({ name: 'lng', type: Number })
  @ApiQuery({ name: 'radius', type: Number, required: false, description: 'Radius in km (default 3)' })
  @ApiResponse({ status: 200, type: [DriverDto] })
  findNearby(@Query('lat') lat: number, @Query('lng') lng: number, @Query('radius') radius = 3) {
    return this.driverService.findNearby(Number(lat), Number(lng), Number(radius));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a single driver by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: DriverDto })
  findById(@Param('id') id: string) {
    return this.driverService.findById(id);
  }
}
