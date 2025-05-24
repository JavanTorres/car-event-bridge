import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateVehicleRequestDto {
  @ApiProperty({
    example: 'ABC1234',
    description: 'Placa do veículo (7 a 8 caracteres, letras e números)',
  })
  @IsNotEmpty()
  @IsString()
  @Length(7, 8)
  placa: string;

  @ApiProperty({
    example: '9BWZZZ377VT004251',
    description: 'Número do chassi (17 caracteres alfanuméricos)',
  })
  @IsNotEmpty()
  @IsString()
  chassi: string;

  @ApiProperty({
    example: '12345678901',
    description: 'Número RENAVAM (somente dígitos)',
  })
  @IsNotEmpty()
  @IsString()
  renavam: string;

  @ApiProperty({
    example: 'Civic LX',
    description: 'Modelo do veículo',
  })
  @IsNotEmpty()
  @IsString()
  modelo: string;

  @ApiProperty({
    example: 'Honda',
    description: 'Marca do veículo',
  })
  @IsNotEmpty()
  @IsString()
  marca: string;

  @ApiProperty({
    example: 2022,
    description: 'Ano de fabricação',
  })
  @IsNotEmpty()
  @IsNumber()
  ano: number;
}
