import { Inject, Injectable } from '@nestjs/common';

import { CreateVehicleDto } from '@application/dto/create-vehicle.dto';
import { PublisherPort } from '@application/ports/publisher.port';
import { CreateVehicleUseCase } from '@application/usecases/create-vehicle.usecase';
import { Vehicle } from '@domain/entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,

    @Inject(PublisherPort)
    private readonly vehiclePublisher: PublisherPort<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.createVehicleUseCase.execute(createVehicleDto);
    await this.vehiclePublisher.publish(vehicle);
    return vehicle;
  }
}
