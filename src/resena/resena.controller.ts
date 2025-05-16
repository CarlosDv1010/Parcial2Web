import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ResenaService } from './resena.service';
import { CreateResenaDTO } from './dto/create-resena.dto';
import { Resena } from './entities/resena.entity';

@Controller('resenas')
export class ResenaController {
  constructor(private readonly resenaService: ResenaService) {}

}