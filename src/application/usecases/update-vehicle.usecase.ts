import { Injectable, NotFoundException } from '@nestjs/common';

import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';
import { Vehicle } from '@domain/entities/vehicle.entity';

import { CreateVehicleDto } from '../dto/create-vehicle.dto';

@Injectable()
export class UpdateVehicleUseCase {
  constructor(private readonly vehicleRepository: VehicleRepositoryContract) {}

  async execute(uuid: string, createVehicleDto: CreateVehicleDto) {
    const vehicle = new Vehicle(
      uuid,
      createVehicleDto.placa,
      createVehicleDto.chassi,
      createVehicleDto.renavam,
      createVehicleDto.modelo,
      createVehicleDto.marca,
      createVehicleDto.ano,
    );
    const vehicleUpdated = await this.vehicleRepository.update(vehicle);
    if (!vehicleUpdated) {
      throw new NotFoundException(`Veículo uuid ${uuid} não encontrado.`);
    }
    return vehicleUpdated;
  }
}
