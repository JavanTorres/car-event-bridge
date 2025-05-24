import { Vehicle } from '@domain/entities/vehicle.entity';

import { VehicleResponseDto } from '../dto/vehicle-response.dto';

export class VehicleMapper {
  static toResponse(vehicle: Vehicle): VehicleResponseDto {
    return {
      uuid: vehicle.uuid,
      placa: vehicle.placa,
      chassi: vehicle.chassi,
      renavam: vehicle.renavam,
      modelo: vehicle.modelo,
      marca: vehicle.marca,
      ano: vehicle.ano,
    };
  }
}
