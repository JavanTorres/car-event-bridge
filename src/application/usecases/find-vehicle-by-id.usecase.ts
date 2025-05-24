import { Injectable, NotFoundException } from '@nestjs/common';

import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';
import { Vehicle } from '@domain/entities/vehicle.entity';

@Injectable()
export class FindVehicleByIdUseCase {
  constructor(private readonly vehicleRepository: VehicleRepositoryContract) {}

  async execute(uuid: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(uuid);
    if (!vehicle) {
      throw new NotFoundException(`Veículo uuid ${uuid} não encontrado.`);
    }
    return vehicle;
  }
}
