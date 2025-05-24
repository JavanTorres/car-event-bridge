import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { CreateVehicleRequestDto } from '@presentation/dto/create-vehicle-request.dto';
import { VehicleResponseDto } from '@presentation/dto/vehicle-response.dto';
import { VehicleMapper } from '@presentation/mappers/vehicle.mapper';
import { VehicleService } from '@services/vehicle.service';

@Controller({
  path: 'vehicles',
  version: '1',
})
@ApiTags('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehicleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo veículo' })
  @ApiCreatedResponse({
    description: 'Veículo criado com sucesso',
    type: VehicleResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createVehicleRequestDto: CreateVehicleRequestDto,
  ): Promise<VehicleResponseDto> {
    const vehicle = await this.vehiclesService.create(createVehicleRequestDto);
    return VehicleMapper.toResponse(vehicle);
  }
}
