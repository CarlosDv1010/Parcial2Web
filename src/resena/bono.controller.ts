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
import { CreateBonoDto } from './dto/create-resena.dto';
import { Resena } from './entities/resena.entity';

@Controller('bonos')
export class BonoController {
  constructor(private readonly bonoService: BonoService) {}

  @Post()
  async crearBono(@Body() createBonoDto: CreateBonoDto): Promise<Resena> {
    return this.bonoService.crearBono(createBonoDto);
  }

  @Get(':cod')
  async findBonoByCodigo(
    @Param('cod', ParseIntPipe) cod: number,
  ): Promise<Resena | null> {
    return this.bonoService.findBonoByCodigo(cod);
  }

  @Get('usuario/:userId')
  async findAllBonosByUsuario(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Resena[]> {
    return this.bonoService.findAllBonosByUsuario(userId);
  }

  @Delete(':id')
  async deleteBono(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bonoService.deleteBono(id);
  }
}