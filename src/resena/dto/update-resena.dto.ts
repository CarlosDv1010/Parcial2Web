import { PartialType } from '@nestjs/mapped-types';
import { CreateResenaDTO } from './create-resena.dto';

export class UpdateResenaDTO extends PartialType(CreateResenaDTO) {}
