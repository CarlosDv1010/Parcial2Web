import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateResenaDTO {
  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  calificacion: number;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsInt()
  @IsNotEmpty()
  actividadId: number;

  @IsInt()
  @IsNotEmpty()
  estudianteId: number;
}
