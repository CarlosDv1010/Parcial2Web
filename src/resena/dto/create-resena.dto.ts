import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResenaDTO {
  @IsInt()
  @IsNotEmpty()
  calificacion: number;

  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsOptional()
  @IsInt()
  actividadid?: number;  

  @IsOptional()
  @IsInt()
  estudianteid?: number; 
 
}
