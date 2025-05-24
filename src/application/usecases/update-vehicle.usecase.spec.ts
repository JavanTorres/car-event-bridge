import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';
import { Vehicle } from '@domain/entities/vehicle.entity';

import { CreateVehicleDto } from '../dto/create-vehicle.dto';

import { UpdateVehicleUseCase } from './update-vehicle.usecase';

describe('UpdateVehicleUseCase', () => {
  let useCase: UpdateVehicleUseCase;
  let repository: jest.Mocked<VehicleRepositoryContract>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateVehicleUseCase,
        {
          provide: VehicleRepositoryContract,
          useValue: { update: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get(UpdateVehicleUseCase);
    repository = module.get(VehicleRepositoryContract);
  });

  it('deve retornar o veículo atualizado quando encontrado', async () => {
    const uuid = 'uuid-1234';
    const dto: CreateVehicleDto = {
      placa: 'ABC1234',
      chassi: 'XYZ987',
      renavam: '123456789',
      modelo: 'ModelX',
      marca: 'BrandY',
      ano: 2020,
    };
    const updatedVehicle = new Vehicle(
      uuid,
      dto.placa,
      dto.chassi,
      dto.renavam,
      dto.modelo,
      dto.marca,
      dto.ano,
    );

    repository.update.mockResolvedValue(updatedVehicle);

    const result = await useCase.execute(uuid, dto);

    expect(repository.update).toHaveBeenCalledWith(updatedVehicle);
    expect(result).toEqual(updatedVehicle);
  });

  it('deve lançar NotFoundException quando o veículo não for encontrado', async () => {
    const uuid = 'uuid-9999';
    const dto: CreateVehicleDto = {
      placa: 'DEF5678',
      chassi: 'LMN123',
      renavam: '987654321',
      modelo: 'ModelY',
      marca: 'BrandZ',
      ano: 2021,
    };

    repository.update.mockResolvedValue(null);

    await expect(useCase.execute(uuid, dto)).rejects.toThrow(
      new NotFoundException(`Veículo uuid ${uuid} não encontrado.`),
    );
    expect(repository.update).toHaveBeenCalledWith(
      new Vehicle(
        uuid,
        dto.placa,
        dto.chassi,
        dto.renavam,
        dto.modelo,
        dto.marca,
        dto.ano,
      ),
    );
  });

  it('deve propagar erro do repository.update', async () => {
    const uuid = 'uuid-5678';
    const dto: CreateVehicleDto = {
      placa: 'GHI9012',
      chassi: 'OPQ456',
      renavam: '555444333',
      modelo: 'ModelZ',
      marca: 'BrandA',
      ano: 2022,
    };
    const error = new Error('falha no banco');
    repository.update.mockRejectedValue(error);

    await expect(useCase.execute(uuid, dto)).rejects.toThrow('falha no banco');
  });
});
