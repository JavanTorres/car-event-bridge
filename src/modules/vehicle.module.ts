import { Module } from '@nestjs/common';

import { CreateVehicleUseCase } from '@application/usecases/create-vehicle.usecase';
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
    { provide: VehicleRepositoryContract, useClass: VehicleRepositoryImpl },
  ],
})
export class VehicleModule {}
