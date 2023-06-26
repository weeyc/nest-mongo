import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

import { MovieService } from './movie.service';
import { Movie } from 'src/shared/mongo-schema/movie.schema';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie-dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAll(@Query() query: ExpressQuery): Promise<Movie[]> {
    return this.movieService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard()) // protect this route
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Movie> {
    return this.movieService.remove(id);
  }
}
