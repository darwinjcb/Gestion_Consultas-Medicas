// src/pacientes/dto/create-paciente.dto.ts:
import {
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreatePacienteDto {
    @IsDateString()
    fecha_nacimiento: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    apellido?: string;

    @IsOptional()
    @IsString()
    direccion?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    telefono?: string;
}