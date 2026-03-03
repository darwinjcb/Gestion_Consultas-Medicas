import { IsDateString, IsEnum, IsInt, IsString } from 'class-validator';
import { EstadoCita } from '../../generated/prisma/enums';

export class CreateCitaDto {
    @IsDateString()
    fecha: string;

    @IsString()
    motivo: string;

    @IsEnum(EstadoCita)
    estado: EstadoCita;

    @IsInt()
    id_paciente: number;

    @IsInt()
    id_doctor: number;
}