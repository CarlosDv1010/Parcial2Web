import { IsString, IsNotEmpty, IsEnum, IsOptional, IsInt } from 'class-validator';
export class CreateEstudianteDto {

  @IsInt()
  @IsNotEmpty()
  cedula: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  correo: string;

  @IsNotEmpty()
  @IsString()
  programa: string;

  @IsNotEmpty()
  @IsInt()
  semestre: number;

  @IsOptional()
  @IsInt({ each: true })
  actividadesids?: number[];  

  @IsOptional()
  @IsInt({ each: true })
  resenasids?: number[]; 
}
