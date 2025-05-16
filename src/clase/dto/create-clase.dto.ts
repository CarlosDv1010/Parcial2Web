import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateClaseDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsInt()
  @IsNotEmpty()
  numeroCreditos: number;

  @IsInt()
  @IsNotEmpty()
  profesorId: number; 
}
