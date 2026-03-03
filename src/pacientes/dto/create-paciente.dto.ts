import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreatePacienteDto {
    @IsDateString()
    fecha_nacimiento: string;

    @IsString()
    nombre: string;

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