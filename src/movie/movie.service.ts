import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Movie } from 'src/shared/mongo-schema/movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: mongoose.Model<Movie>,
  ) {}

  async create(movie: Movie): Promise<Movie> {
    const data = Object.assign(movie);
    const res = await this.movieModel.create(data);
    return res;
  }

  async findAll(query: Query): Promise<Movie[]> {
    const limit = query.limit || 10;

    // page = 1 if no requested query page
    const currentPage = Number(query.page) || 1;

    // find all books
    const skip = Number(limit) * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword, // regular expression
            $options: 'i', // case insensitive
          },
        }
      : {};
    const movies = await this.movieModel
      .find({ ...keyword })
      .limit(Number(limit))
      .skip(skip);
    return movies;
  }

  async findOne(id: string): Promise<Movie> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid Id');
    }
    const movie = await this.movieModel.findById(id);

    console.log(movie);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async update(id: string, movie: Movie): Promise<Movie> {
    return await this.movieModel.findByIdAndUpdate(id, movie, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string): Promise<Movie> {
    return await this.movieModel.findByIdAndDelete(id);
  }
}
