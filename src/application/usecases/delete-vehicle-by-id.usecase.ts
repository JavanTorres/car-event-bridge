import { Injectable, NotFoundException } from '@nestjs/common';

import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';

@Injectable()
export class DeleteVehicleByIdUseCase {
  constructor(private readonly vehicleRepository: VehicleRepositoryContract) {}

  async execute(uuid: string): Promise<void> {
    const deleted = await this.vehicleRepository.deleteById(uuid);
    if (!deleted) {
      throw new NotFoundException(`Veículo uuid ${uuid} não encontrado.`);
    }
  }
}
