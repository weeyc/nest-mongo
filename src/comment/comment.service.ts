import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Comment } from 'src/shared/mongo-schema/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: mongoose.Model<Comment>,
  ) {}

  async create(comment: Comment): Promise<Comment> {
    const data = Object.assign(comment);
    const res = await this.commentModel.create(data);
    return res;
  }

  async findAll(query: Query): Promise<Comment[]> {
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
    const comments = await this.commentModel
      .find({ ...keyword })
      .limit(Number(limit))
      .skip(skip);
    return comments;
  }

  async findOne(id: string): Promise<Comment> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid Id');
    }
    const comment = (await this.commentModel.findById(id)).populate('movie_id');

    console.log(comment);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: string, comment: Comment): Promise<Comment> {
    return await this.commentModel.findByIdAndUpdate(id, comment, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string): Promise<Comment> {
    return await this.commentModel.findByIdAndDelete(id);
  }
}
