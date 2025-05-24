import { NotFoundException } from '@nestjs/common';

import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';
import { Vehicle } from '@domain/entities/vehicle.entity';

import { FindVehicleByIdUseCase } from './find-vehicle-by-id.usecase';

describe('FindVehicleByIdUseCase', () => {
  let repository: jest.Mocked<VehicleRepositoryContract>;
  let useCase: FindVehicleByIdUseCase;

  const dummyVehicle = new Vehicle(
    'uuid-1234-abcd',
    'ABC-1234',
    'CHASSI123456',
    'RENAVAM987654',
    'Model X TORRES J',
    'Brand Y',
    2025,
  );

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new FindVehicleByIdUseCase(repository);
  });

  it('deve retornar o veículo quando o UUID existir', async () => {
    repository.findById.mockResolvedValue(dummyVehicle);

    const result = await useCase.execute('uuid-1234-abcd');

    expect(repository.findById).toHaveBeenCalledWith('uuid-1234-abcd');
    expect(result).toBe(dummyVehicle);
  });

  it('deve lançar NotFoundException quando não encontrar o veículo', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute('invalid-uuid')).rejects.toBeInstanceOf(
      NotFoundException,
    );

    await expect(useCase.execute('invalid-uuid')).rejects.toThrow(
      'Veículo uuid invalid-uuid não encontrado.',
    );

    expect(repository.findById).toHaveBeenCalledWith('invalid-uuid');
  });
});
