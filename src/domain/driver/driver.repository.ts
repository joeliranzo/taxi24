import { Driver } from './driver.entity';

export interface DriverRepository {
  findAll(): Promise<Driver[]>;
  findAvailable(): Promise<Driver[]>;
  findNearby(lat: number, lng: number, radius: number): Promise<Driver[]>;
  findById(id: string): Promise<Driver | null>;
  create(driver: Partial<Driver>): Promise<Driver>;
  update(id: string, driver: Partial<Driver>): Promise<Driver>;
}
