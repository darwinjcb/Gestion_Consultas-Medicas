import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRecetaDto {
    @IsOptional()
    @IsDateString()
    fecha_emision?: string;

    @IsOptional()
    @IsString()
    indicaciones?: string;

    @IsInt()
    id_cita: number;
}