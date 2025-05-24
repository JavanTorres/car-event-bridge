import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiNoContentResponse,
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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retorna todos os veículos' })
  @ApiOkResponse({
    description: 'Lista de veículos',
    type: VehicleResponseDto,
    isArray: true,
  })
  async findAll(): Promise<VehicleResponseDto[]> {
    const vehicles = await this.vehiclesService.findAll();
    return vehicles.map(VehicleMapper.toResponse);
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retorna um veículo pelo UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID do veículo' })
  @ApiOkResponse({
    description: 'Veículo encontrado',
    type: VehicleResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Veículo não encontrado' })
  async findById(@Param('uuid') uuid: string): Promise<VehicleResponseDto> {
    const vehicle = await this.vehiclesService.findById(uuid);
    return VehicleMapper.toResponse(vehicle);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um veículo pelo UUID' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID v4 do veículo',
    schema: { format: 'uuid' },
  })
  @ApiNoContentResponse({ description: 'Veículo deletado com sucesso' })
  @ApiNotFoundResponse({ description: 'Veículo não encontrado' })
  @ApiBadRequestResponse({ description: 'UUID inválido' })
  async deleteById(@Param('uuid') uuid: string): Promise<void> {
    await this.vehiclesService.deleteById(uuid);
  }

  @Put(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza um veículo existente' })
  @ApiOkResponse({
    description: 'Veículo atualizado com sucesso',
    type: VehicleResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  async update(
    @Param('uuid') uuid: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createVehicleRequestDto: CreateVehicleRequestDto,
  ): Promise<VehicleResponseDto> {
    const vehicle = await this.vehiclesService.update(
      uuid,
      createVehicleRequestDto,
    );
    return VehicleMapper.toResponse(vehicle);
  }
}
