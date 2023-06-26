import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

/// CREATE DTOs
class CreateAddressDto {
  @IsNotEmpty()
  street1: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zipcode: number;
}

export class CreateGeoDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: number[];
}

export class CreateLocationDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateGeoDto)
  geo: CreateGeoDto;
}

export class CreateTheaterDto {
  @IsNotEmpty()
  @IsInt()
  theaterId: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;
}

/// UPDATE DTOs
export class UpdateAddressDto {
  @IsOptional()
  street1: string;

  @IsOptional()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  zipcode: number;
}

export class UpdateGeoDto {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: number[];
}

export class UpdateLocationDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateGeoDto)
  geo: UpdateGeoDto;
}

export class UpdateTheaterDto {
  @IsOptional()
  @IsNumber()
  theaterId: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocationDto)
  location: UpdateLocationDto;
}
