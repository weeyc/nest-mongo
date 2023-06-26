import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Awards } from '../../shared/mongo-schema/movie.schema';
import { Type } from 'class-transformer';

export class CreateViewerDto {
  @IsNotEmpty()
  @IsNumber()
  readonly rating: number;

  @IsNotEmpty()
  @IsNumber()
  readonly numReviews: number;

  @IsNotEmpty()
  @IsNumber()
  readonly meter: number;
}

export class CreateTomatoesDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateViewerDto)
  readonly viewer: CreateViewerDto;

  @IsNotEmpty()
  @IsDate()
  readonly lastUpdated: Date;
}

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  readonly plot: string;

  @IsArray()
  readonly genres: string[];

  @IsNotEmpty()
  @IsNumber()
  readonly runtime: number;

  @IsArray()
  readonly cast: string[];

  @IsNotEmpty()
  @IsNumber()
  readonly num_mflix_comments: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly fullplot: string;

  @IsArray()
  readonly languages: string[];

  @IsArray()
  readonly countries: string[];

  @IsNotEmpty()
  @Type(() => Date)
  readonly released: Date;

  @IsArray()
  readonly directors: string[];

  @IsNotEmpty()
  @IsString()
  readonly rated: string;

  @IsNotEmpty()
  readonly awards: Awards;

  @IsNotEmpty()
  readonly lastupdated: Date;

  @IsNotEmpty()
  readonly year: number;

  @IsNotEmpty()
  readonly imdb: {
    rating: number;
    votes: number;
    id: number;
  };

  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @Type(() => CreateTomatoesDto)
  readonly tomatoes: CreateTomatoesDto;
}

export class UpdateViewerDto {
  @IsOptional()
  @IsNumber()
  readonly rating: number;

  @IsOptional()
  @IsNumber()
  readonly numReviews: number;

  @IsOptional()
  @IsNumber()
  readonly meter: number;
}

export class UpdateTomatoesDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateViewerDto)
  readonly viewer: UpdateViewerDto;

  @IsOptional()
  @IsDate()
  readonly lastUpdated: Date;
}

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  readonly plot: string;

  @IsArray()
  readonly genres: string[];

  @IsOptional()
  @IsNumber()
  readonly runtime: number;

  @IsOptional()
  @IsArray()
  readonly cast: string[];

  @IsOptional()
  @IsNumber()
  readonly num_mflix_comments: number;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly fullplot: string;

  @IsOptional()
  @IsArray()
  readonly languages: string[];

  @IsOptional()
  @IsArray()
  readonly countries: string[];

  @IsOptional()
  @Type(() => Date)
  readonly released: Date;

  @IsOptional()
  @IsArray()
  readonly directors: string[];

  @IsOptional()
  @IsString()
  readonly rated: string;

  @IsOptional()
  @IsNotEmpty()
  readonly awards: Awards;

  @IsOptional()
  @IsNotEmpty()
  readonly imdb: {
    rating: number;
    votes: number;
    id: number;
  };

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  readonly lastupdated: Date;

  @IsOptional()
  readonly year: number;

  @IsOptional()
  @Type(() => UpdateTomatoesDto)
  readonly tomatoes: UpdateTomatoesDto;
}
