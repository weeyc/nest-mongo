import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { CommentModule } from './comment/comment.module';
import { TheaterModule } from './theater/theater.module';
import { PeopleModule } from './people/people.module';
import { BookingModule } from './booking/booking.module';
import { InfobiqModule } from './infobiq/infobiq.module';

/// Whole app modules, controllers, services, etc. here.
@Module({
  imports: [
    // Configuration Module
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // MonggoDB Module
    MongooseModule.forRoot(process.env.DB_URI, {}),

    // Book Module
    BookModule,

    AuthModule,

    MovieModule,

    CommentModule,

    TheaterModule,

    PeopleModule,

    BookingModule,

    InfobiqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
