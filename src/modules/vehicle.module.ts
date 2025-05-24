import { Module } from '@nestjs/common';

import { CreateVehicleUseCase } from '@application/usecases/create-vehicle.usecase';
import { DeleteVehicleByIdUseCase } from '@application/usecases/delete-vehicle-by-id.usecase';
import { FindAllVehiclesUseCase } from '@application/usecases/find-all-vehicles.usecase';
import { FindVehicleByIdUseCase } from '@application/usecases/find-vehicle-by-id.usecase';
import { UpdateVehicleUseCase } from '@application/usecases/update-vehicle.usecase';
import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';
import { VehicleRepositoryImpl } from '@infrastructure/database/vehicle.repository.impl';
import { VehiclesController } from '@presentation/controllers/vehicles.controller';
import { VehicleService } from '@services/vehicle.service';

import { KafkaModule } from './kafka.module';
import { MongodbModule } from './mongodb.module';

@Module({
  imports: [KafkaModule, MongodbModule],
  controllers: [VehiclesController],
  providers: [
    VehicleService,
    CreateVehicleUseCase,
    FindAllVehiclesUseCase,
    FindVehicleByIdUseCase,
    DeleteVehicleByIdUseCase,
    UpdateVehicleUseCase,
    { provide: VehicleRepositoryContract, useClass: VehicleRepositoryImpl },
  ],
})
export class VehicleModule {}
