// src/doctores/dto/create-doctor.dto.ts:
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateDoctorDto {
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsInt()
    id_especialidad: number;
}