import { IsString, IsNotEmpty, IsEnum, IsOptional, IsInt } from 'class-validator';
import { RolUsuario } from '../../common/role.enum'; // Ajusta la ruta si es necesario

export class CreateEstudianteDto {
  @IsInt()
  @IsNotEmpty()
  cedula: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  grupoInvestigacion?: string;

  @IsOptional()
  @IsInt()
  numeroExtension?: number;

  @IsEnum(RolUsuario)
  @IsNotEmpty()
  rol: RolUsuario;

  @IsOptional()
  @IsInt()
  jefeId?: number; 

  @IsOptional()
  @IsInt({ each: true })
  claseIds?: number[];  

  @IsOptional()
  @IsInt({ each: true })
  bonoIds?: number[]; 
}
