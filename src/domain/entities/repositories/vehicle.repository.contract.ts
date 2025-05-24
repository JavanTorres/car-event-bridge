import { Vehicle } from '../vehicle.entity';

export abstract class VehicleRepositoryContract {
  abstract create(vehicle: Vehicle): Promise<Vehicle>;
  abstract findAll(): Promise<Vehicle[]>;
  abstract findById(uuid: string): Promise<Vehicle | null>;
  abstract deleteById(uuid: string): Promise<boolean>;
  abstract update(vehicle: Vehicle): Promise<Vehicle | null>;
}
