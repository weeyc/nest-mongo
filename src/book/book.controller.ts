import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '../shared/mongo-schema/book.schema';
import { CreateBookDto, UpdateBookDto } from './dto/book-dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard()) // protect this route
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    // Sample Request
    // console.log('User');
    // console.log(req.user);
    // console.log('\nBody');
    // console.log(req.body);
    // console.log('\nQuery');
    // console.log(req.query);
    // console.log('\nParams');
    // console.log(req.params);
    // console.log('\nheaders');
    // console.log(req.headers);
    // console.log('\nCookies');
    // console.log(req.cookies);
    return this.bookService.create(createBookDto, req.user);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, updateBookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
