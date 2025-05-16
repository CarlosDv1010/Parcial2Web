import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BonoService } from './bono.service';
import { CreateBonoDto } from './dto/create-bono.dto';
import { Bono } from './entities/bono.entity';

@Controller('bonos')
export class BonoController {
  constructor(private readonly bonoService: BonoService) {}

  @Post()
  async crearBono(@Body() createBonoDto: CreateBonoDto): Promise<Bono> {
    return this.bonoService.crearBono(createBonoDto);
  }

  @Get(':cod')
  async findBonoByCodigo(
    @Param('cod', ParseIntPipe) cod: number,
  ): Promise<Bono | null> {
    return this.bonoService.findBonoByCodigo(cod);
  }

  @Get('usuario/:userId')
  async findAllBonosByUsuario(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Bono[]> {
    return this.bonoService.findAllBonosByUsuario(userId);
  }

  @Delete(':id')
  async deleteBono(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bonoService.deleteBono(id);
  }
}