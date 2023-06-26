import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Address, Theater } from 'src/shared/mongo-schema/theater.schema';

@Injectable()
export class TheaterService {
  constructor(
    // Inject mongoose model
    @InjectModel(Theater.name)
    private theaterModel: mongoose.Model<Theater>,
  ) {}

  //http://localhost:3000/theaters?limit=10&page=4&keyword=theater
  async findAll(query: Query): Promise<Theater[]> {
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
    const theaters = await this.theaterModel
      .find({ ...keyword })
      .limit(Number(limit))
      .skip(skip);
    return theaters;
  }

  async create(theater: Theater): Promise<Theater> {
    const data = Object.assign(theater);
    console.log('Service');
    console.log(theater);
    const res = await this.theaterModel.create(data);

    return res;
  }

  async findById(id: string): Promise<Theater> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid Id');
    }
    const theater = await this.theaterModel.findById(id);

    console.log(theater);
    if (!theater) {
      throw new NotFoundException('Theater not found');
    }
    return theater;
  }

  async updateById(id: string, theater: Theater): Promise<Theater> {
    return await this.theaterModel.findByIdAndUpdate(id, theater, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Theater> {
    return await this.theaterModel.findByIdAndDelete(id);
  }

  async updateAddressById(id: string, address: Address): Promise<Theater> {
    const updatedTheater = await this.theaterModel.findByIdAndUpdate(
      id,
      { 'location.address': address },
      { new: true, runValidators: true },
    );
    if (!updatedTheater) {
      throw new NotFoundException('Theater not found');
    }
    return updatedTheater;
  }
}
