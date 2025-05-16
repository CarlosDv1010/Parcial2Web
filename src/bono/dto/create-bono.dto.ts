import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBonoDto {
  @IsInt()
  @IsNotEmpty()
  monto: number;

  @IsNumber()
  @IsNotEmpty()
  calificacion: number;

  @IsString()
  @IsNotEmpty()
  palabraClave: string;

  @IsInt()
  @IsNotEmpty()
  usuarioId: number;  

  @IsInt()
  @IsNotEmpty()
  claseId: number;  
}
