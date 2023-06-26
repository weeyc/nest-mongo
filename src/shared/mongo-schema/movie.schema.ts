import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

export class Awards {
  @Prop()
  wins: number;

  @Prop()
  nominations: number;

  @Prop()
  text: string;
}

export class Viewer {
  @Prop()
  rating: number;

  @Prop()
  numReviews: number;

  @Prop()
  meter: number;
}

export class Tomatoes {
  @Prop()
  viewer: Viewer;

  @Prop()
  lastUpdated: Date;
}

@Schema({ timestamps: false, versionKey: false })
export class Movie {
  @Prop()
  plot: string;

  @Prop()
  genres: string[];

  @Prop()
  runtime: number;

  @Prop()
  cast: string[];

  @Prop()
  num_mflix_comments: number;

  @Prop()
  title: string;

  @Prop()
  fullplot: string;

  @Prop()
  languages: string[];

  @Prop()
  countries: string[];

  @Prop()
  released: Date;

  @Prop()
  directors: string[];

  @Prop()
  rated: string;

  @Prop({ type: Awards })
  awards: Awards;

  @Prop()
  lastupdated: Date;

  @Prop()
  year: number;

  @Prop(
    raw({
      rating: { type: Number },
      votes: { type: Number },
      id: { type: Number },
    }),
  )
  imdb: Record<string, any>;

  @Prop()
  type: string;

  @Prop({ type: Tomatoes })
  tomatoes: Tomatoes;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
