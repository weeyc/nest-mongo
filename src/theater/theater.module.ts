import { Module } from '@nestjs/common';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Theater, TheaterSchema } from 'src/shared/mongo-schema/theater.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Theater.name, schema: TheaterSchema }]),
  ],
  controllers: [TheaterController],
  providers: [TheaterService],
})
export class TheaterModule {}
