import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';
import { Vehicle } from '@domain/entities/vehicle.entity';
import { VehicleDocument } from '@shared/mongodb/vehicle.schema';

@Injectable()
export class VehicleRepositoryImpl implements VehicleRepositoryContract {
  constructor(
    @InjectModel(VehicleDocument.name)
    private readonly model: Model<VehicleDocument>,
  ) {}

  async create(vehicle: Vehicle): Promise<Vehicle> {
    const createdDoc = await this.model.create({
      uuid: vehicle.uuid,
      placa: vehicle.placa,
      chassi: vehicle.chassi,
      renavam: vehicle.renavam,
      modelo: vehicle.modelo,
      marca: vehicle.marca,
      ano: vehicle.ano,
    });

    return new Vehicle(
      createdDoc.uuid,
      createdDoc.placa,
      createdDoc.chassi,
      createdDoc.renavam,
      createdDoc.modelo,
      createdDoc.marca,
      createdDoc.ano,
    );
  }
}
