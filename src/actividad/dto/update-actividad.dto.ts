import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadDTO } from './create-actividad.dto';

export class UpdateActividadDto extends PartialType(CreateActividadDTO) {}
