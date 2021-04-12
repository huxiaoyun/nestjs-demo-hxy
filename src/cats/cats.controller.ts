import {
  Controller,
  Get,
  Post,
  Body,
  Header,
  Param,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from '../common/filter/forbidden.filter';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  @UseFilters(new HttpExceptionFilter())
  findAll(@Req() request: Request): Cat[] {
    console.log('request', request.query);
    const { name } = request.query;
    return this.catsService.findAll();
  }

  @Post('/create')
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('/findOne/:id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

}
