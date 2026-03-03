import { IsOptional, IsString } from 'class-validator';

export class CreateMedicamentoDto {
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string;
}