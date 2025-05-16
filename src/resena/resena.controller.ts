import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ResenaService } from './resena.service';
import { CreateResenaDTO } from './dto/create-resena.dto';
import { Resena } from './entities/resena.entity';

@Controller('resenas')
export class ResenaController {
  constructor(private readonly resenaService: ResenaService) {}

  @Post()
  async agregarResena(@Body() createResenaDto: CreateResenaDTO): Promise<Resena> {
    return this.resenaService.agregarResena(createResenaDto);
  }
}