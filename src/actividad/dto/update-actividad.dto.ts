import { PartialType } from '@nestjs/mapped-types';
import { CreateClaseDto } from './create-actividad.dto';

export class UpdateClaseDto extends PartialType(CreateClaseDto) {}
