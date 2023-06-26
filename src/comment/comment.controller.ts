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

import { Comment } from 'src/shared/mongo-schema/comment.schema';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment-dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAll(@Query() query: ExpressQuery): Promise<Comment[]> {
    return this.commentService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Comment> {
    return this.commentService.remove(id);
  }
}
