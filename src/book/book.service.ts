import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../shared/mongo-schema/book.schema';
// all as mongoose
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from 'src/shared/mongo-schema/user.schema';

@Injectable()
export class BookService {
  constructor(
    // Inject mongoose model
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
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
    const books = await this.bookModel
      .find({ ...keyword })
      .limit(Number(limit))
      .skip(skip);
    return books;
  }

  async create(book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });
    console.log(data);
    //const res = await this.bookModel.create(data);
    const res = await this.bookModel.create(data);

    return res;
  }
  //pro revenge, fun ask , mildy
  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      // book null
      throw new BadRequestException('Invalid Id');
    }
    const book = (await this.bookModel.findById(id)).populate('user');
    console.log(book);
    if (!book) {
      // book null
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
