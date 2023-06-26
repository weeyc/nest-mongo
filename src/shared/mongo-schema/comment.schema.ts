import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

/// Document/Model Fields Declaration

@Schema({ timestamps: false, versionKey: false })
export class Comment {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' })
  movie_id: string;

  @Prop()
  text: string;

  @Prop()
  date: Date;
}

// Export the Comment Schema
export const CommentSchema = SchemaFactory.createForClass(Comment);
