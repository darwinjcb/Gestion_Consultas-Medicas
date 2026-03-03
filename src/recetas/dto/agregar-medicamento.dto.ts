// src/recetas/dto/agregar-medicamento.dto.ts:
import { IsInt, IsString } from 'class-validator';

export class AgregarMedicamentoDto {
    @IsInt()
    id_medicamento: number;

    @IsString()
    dosis: string;

    @IsString()
    frecuencia: string;
}