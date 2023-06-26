import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/// Document Default Fields
export class Address {
  @Prop()
  street1: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipcode: number;
}

export class Geo {
  @Prop()
  type: string;

  @Prop()
  coordinates: number[];
}

export class Location {
  @Prop({ type: Address })
  address: Address;

  @Prop({ type: Geo })
  geo: Geo;
}

@Schema({ timestamps: false, versionKey: false })
export class Theater {
  @Prop()
  theaterId: number;

  @Prop({ type: Location })
  location: Location;
}

export const TheaterSchema = SchemaFactory.createForClass(Theater);
