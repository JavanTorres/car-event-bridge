import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';
import { Vehicle } from '@domain/entities/vehicle.entity';

import { CreateVehicleDto } from '../dto/create-vehicle.dto';

@Injectable()
export class CreateVehicleUseCase {
  constructor(private readonly vehicleRepository: VehicleRepositoryContract) {}

  async execute(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = new Vehicle(
      uuidv4(),
      createVehicleDto.placa,
      createVehicleDto.chassi,
      createVehicleDto.renavam,
      createVehicleDto.modelo,
      createVehicleDto.marca,
      createVehicleDto.ano,
    );
    return this.vehicleRepository.create(vehicle);
  }
}
