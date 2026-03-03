// src/especialidades/dto/create-especialidad.dto.ts:
import { IsString } from 'class-validator';

export class CreateEspecialidadDto {
    @IsString()
    nombre: string;
}