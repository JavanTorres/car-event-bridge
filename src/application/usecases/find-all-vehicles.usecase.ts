import { Injectable } from '@nestjs/common';

import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';
import { Vehicle } from '@domain/entities/vehicle.entity';

@Injectable()
export class FindAllVehiclesUseCase {
  constructor(private readonly vehicleRepository: VehicleRepositoryContract) {}

  async execute(): Promise<Vehicle[]> {
    return this.vehicleRepository.findAll();
  }
}
