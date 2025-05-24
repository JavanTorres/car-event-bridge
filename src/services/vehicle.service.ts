import { Inject, Injectable } from '@nestjs/common';

import { CreateVehicleDto } from '@application/dto/create-vehicle.dto';
import { PublisherPort } from '@application/ports/publisher.port';
import { CreateVehicleUseCase } from '@application/usecases/create-vehicle.usecase';
import { DeleteVehicleByIdUseCase } from '@application/usecases/delete-vehicle-by-id.usecase';
import { FindAllVehiclesUseCase } from '@application/usecases/find-all-vehicles.usecase';
import { FindVehicleByIdUseCase } from '@application/usecases/find-vehicle-by-id.usecase';
import { UpdateVehicleUseCase } from '@application/usecases/update-vehicle.usecase';
import { Vehicle } from '@domain/entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly findAllVehiclesUseCase: FindAllVehiclesUseCase,
    private readonly findVehicleByIdUseCase: FindVehicleByIdUseCase,
    private readonly deleteVehicleByIdUseCase: DeleteVehicleByIdUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,

    @Inject(PublisherPort)
    private readonly vehiclePublisher: PublisherPort<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.createVehicleUseCase.execute(createVehicleDto);
    await this.vehiclePublisher.publish(
      `${VehicleService.name}_create`,
      vehicle,
    );
    return vehicle;
  }

  async findAll(): Promise<Vehicle[]> {
    return this.findAllVehiclesUseCase.execute();
  }

  async findById(uuid: string): Promise<Vehicle> {
    return this.findVehicleByIdUseCase.execute(uuid);
  }

  async deleteById(uuid: string): Promise<void> {
    return this.deleteVehicleByIdUseCase.execute(uuid);
  }

  async update(uuid: string, createVehicleDto: any): Promise<Vehicle> {
    const vehicle = await this.updateVehicleUseCase.execute(
      uuid,
      createVehicleDto,
    );
    return vehicle;
  }
}
