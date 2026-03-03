// src/citas/dto/update-estado-masivo.dto.ts:
import { IsDateString, IsEnum } from 'class-validator';
import { EstadoCita } from '../../generated/prisma/enums';

export class UpdateEstadoMasivoDto {
    @IsDateString()
    fecha: string; // YYYY-MM-DD

    @IsEnum(EstadoCita)
    estado: EstadoCita;
}