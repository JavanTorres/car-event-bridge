// application/usecases/find-all-vehicles.usecase.spec.ts

import { VehicleRepositoryContract } from '@domain/entities/repositories/vehicle.repository.contract';
import { Vehicle } from '@domain/entities/vehicle.entity';

import { FindAllVehiclesUseCase } from './find-all-vehicles.usecase';

describe('FindAllVehiclesUseCase', () => {
  let useCase: FindAllVehiclesUseCase;
  let repositoryMock: jest.Mocked<VehicleRepositoryContract>;

  beforeEach(() => {
    repositoryMock = {
      findAll: jest.fn(),
    } as any;
    useCase = new FindAllVehiclesUseCase(repositoryMock);
  });

  it('deve retornar uma lista de veículos quando o repositório.findAll resolver veículos', async () => {
    const vehicles: Vehicle[] = [
      new Vehicle(
        'd4f8c7a2-3b6e-4567-b2f1-a9c8e6d5f4b3',
        'XYZ1234',
        '9XG7H6J5K4L3M2N1O',
        '12345678901',
        'Onix Plus',
        'Chevrolet',
        2019,
      ),
      new Vehicle(
        'a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
        'QWE9876',
        '1A2B3C4D5E6F7G8H9',
        '10987654321',
        'Renegade',
        'Jeep',
        2021,
      ),
    ];
    repositoryMock.findAll.mockResolvedValue(vehicles);

    const result = await useCase.execute();

    expect(repositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(vehicles);
  });

  it('deve retornar um array vazio quando não houver veículos', async () => {
    repositoryMock.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(repositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('deve propagar erros lançados pelo repositório', async () => {
    const error = new Error('Falha no banco de dados');
    repositoryMock.findAll.mockRejectedValue(error);

    await expect(useCase.execute()).rejects.toThrow('Falha no banco de dados');
    expect(repositoryMock.findAll).toHaveBeenCalledTimes(1);
  });
});
