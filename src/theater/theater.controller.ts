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
import { TheaterService } from './theater.service';
import { Theater } from 'src/shared/mongo-schema/theater.schema';
import {
  CreateTheaterDto,
  UpdateAddressDto,
  UpdateTheaterDto,
} from './dto/theater-dto';

@Controller('theaters')
export class TheaterController {
  constructor(private theaterService: TheaterService) {}

  @Get()
  async getAll(@Query() query: ExpressQuery): Promise<Theater[]> {
    return this.theaterService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard()) // protect this route
  async create(
    @Body() createTheaterDto: CreateTheaterDto,
    // @Req() req,
  ): Promise<Theater> {
    console.log('Controller');
    console.log(createTheaterDto);
    return this.theaterService.create(createTheaterDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Theater> {
    return this.theaterService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTheaterDto: UpdateTheaterDto,
  ): Promise<Theater> {
    return this.theaterService.updateById(id, updateTheaterDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Theater> {
    return this.theaterService.deleteById(id);
  }

  @Put('address/:id')
  async updateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Theater> {
    return this.theaterService.updateAddressById(id, updateAddressDto);
  }
}
