import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClaseService } from './clase.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { Clase } from './entities/clase.entity';

@Controller('clases')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  @Post()
  async crearClase(@Body() createClaseDto: CreateClaseDto): Promise<Clase> {
    return this.claseService.crearClase(createClaseDto);
  }

  @Get(':id')
  async findClaseById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Clase | null> {
    return this.claseService.findClaseById(id);
  }
}