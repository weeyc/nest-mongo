import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/shared/mongo-schema/user.schema';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSIC = 'Classic',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
  COMEDY = 'Comedy',
}

/// Document Default Fields
@Schema({ timestamps: true })

/// Document/Model Fields Declaration
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

// Export the Book Schema
export const BookSchema = SchemaFactory.createForClass(Book);
