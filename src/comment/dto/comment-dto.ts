import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Movie } from 'src/shared/mongo-schema/movie.schema';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly movie_id: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsString()
  readonly date: Date;
}

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  readonly movie_id: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsOptional()
  @IsString()
  readonly date: Date;
}
