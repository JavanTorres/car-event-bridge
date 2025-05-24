import { Vehicle } from '../vehicle.entity';

export abstract class VehicleRepositoryContract {
  abstract create(vehicle: Vehicle): Promise<Vehicle>;
}
