import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';

export class UpdateUsuarioDto extends PartialType(CreateEstudianteDto) {}
