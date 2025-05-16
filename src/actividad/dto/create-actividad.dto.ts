import { IsString, IsNotEmpty, IsInt, IsOptional, Min } from 'class-validator';

export class CreateActividadDTO {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsInt()
  @IsNotEmpty()
  calificacion: number;

  @IsInt()
  @IsNotEmpty()
  cupoMaximo: number;

  @IsOptional()
  @IsInt({ each: true })
  resenasids?: number[];  

  @IsOptional()
  @IsInt({ each: true })
  inscritosids?: number[]; 
}
