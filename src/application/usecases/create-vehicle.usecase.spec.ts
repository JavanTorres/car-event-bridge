import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';
import { Vehicle } from '@domain/entities/vehicle.entity';

import { CreateVehicleDto } from '../dto/create-vehicle.dto';

import { CreateVehicleUseCase } from './create-vehicle.usecase';

describe('CreateVehicleUseCase', () => {
  let useCase: CreateVehicleUseCase;
  let repo: jest.Mocked<VehicleRepositoryContract>;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
    } as unknown as jest.Mocked<VehicleRepositoryContract>;

    useCase = new CreateVehicleUseCase(repo);
  });

  it('deve gerar um veículo, chamar repo.create e retornar o resultado', async () => {
    const dto: CreateVehicleDto = {
      placa: 'EBC1D23',
      chassi: '9BWZZZ317VT004251',
      renavam: '12345678901',
      modelo: 'Fuscao',
      marca: 'Volkswagen',
      ano: 1974,
    };

    const returnedVehicle = new Vehicle(
      'bd40e43e-f44c-4287-91b9-2dbb77c3d9f1',
      dto.placa,
      dto.chassi,
      dto.renavam,
      dto.modelo,
      dto.marca,
      dto.ano,
    );
    repo.create.mockResolvedValue(returnedVehicle);

    const result = await useCase.execute(dto);

    expect(repo.create).toHaveBeenCalledTimes(1);

    const createdArg = repo.create.mock.calls[0][0];
    expect(createdArg).toBeInstanceOf(Vehicle);

    expect(createdArg.placa).toBe(dto.placa);
    expect(createdArg.chassi).toBe(dto.chassi);
    expect(createdArg.renavam).toBe(dto.renavam);
    expect(createdArg.modelo).toBe(dto.modelo);
    expect(createdArg.marca).toBe(dto.marca);
    expect(createdArg.ano).toBe(dto.ano);

    expect(result).toBe(returnedVehicle);
  });
});
