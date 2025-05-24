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
    const createdVehicle = await this.model.create({
      uuid: vehicle.uuid,
      placa: vehicle.placa,
      chassi: vehicle.chassi,
      renavam: vehicle.renavam,
      modelo: vehicle.modelo,
      marca: vehicle.marca,
      ano: vehicle.ano,
    });

    return new Vehicle(
      createdVehicle.uuid,
      createdVehicle.placa,
      createdVehicle.chassi,
      createdVehicle.renavam,
      createdVehicle.modelo,
      createdVehicle.marca,
      createdVehicle.ano,
    );
  }

  async findAll(): Promise<Vehicle[]> {
    const vehicles = await this.model.find().exec();
    return vehicles.map(
      (vehicle) =>
        new Vehicle(
          vehicle.uuid,
          vehicle.placa,
          vehicle.chassi,
          vehicle.renavam,
          vehicle.modelo,
          vehicle.marca,
          vehicle.ano,
        ),
    );
  }

  async findById(uuid: string): Promise<Vehicle | null> {
    const vehicle = await this.model.findOne({ uuid }).exec();
    if (!vehicle) return null;
    return new Vehicle(
      vehicle.uuid,
      vehicle.placa,
      vehicle.chassi,
      vehicle.renavam,
      vehicle.modelo,
      vehicle.marca,
      vehicle.ano,
    );
  }

  async deleteById(uuid: string): Promise<boolean> {
    const result = await this.model.deleteOne({ uuid }).exec();
    return result.deletedCount === 1;
  }

  async update(vehicle: Vehicle): Promise<Vehicle | null> {
    const updatedVehicle = await this.model
      .findOneAndUpdate(
        { uuid: vehicle.uuid },
        {
          placa: vehicle.placa,
          chassi: vehicle.chassi,
          renavam: vehicle.renavam,
          modelo: vehicle.modelo,
          marca: vehicle.marca,
          ano: vehicle.ano,
        },
        { new: true },
      )
      .exec();

    if (!updatedVehicle) {
      return null;
    }

    return new Vehicle(
      updatedVehicle.uuid,
      updatedVehicle.placa,
      updatedVehicle.chassi,
      updatedVehicle.renavam,
      updatedVehicle.modelo,
      updatedVehicle.marca,
      updatedVehicle.ano,
    );
  }
}
