// src/recetas/recetas.service.ts:
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { AgregarMedicamentoDto } from './dto/agregar-medicamento.dto';

@Injectable()
export class RecetasService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateRecetaDto) {
        return this.prisma.receta.create({
            data: {
                fecha_emision: dto.fecha_emision ? new Date(dto.fecha_emision) : undefined,
                indicaciones: dto.indicaciones,
                cita: {
                    connect: { id_cita: dto.id_cita },
                },
            },
            include: {
                cita: true,
                medicamentos: {
                    include: { medicamento: true },
                },
            },
        });
    }

    findAll() {
        return this.prisma.receta.findMany({
            include: {
                cita: true,
                medicamentos: {
                    include: {
                        medicamento: true,
                    },
                },
            },
            orderBy: { id_receta: 'desc' },
        });
    }

    async findOne(id: number) {
        const receta = await this.prisma.receta.findUnique({
            where: { id_receta: id },
            include: {
                cita: true,
                medicamentos: {
                    include: {
                        medicamento: true,
                    },
                },
            },
        });

        if (!receta) throw new NotFoundException('Receta no encontrada');
        return receta;
    }

    async update(id: number, dto: UpdateRecetaDto) {
        await this.findOne(id);

        return this.prisma.receta.update({
            where: { id_receta: id },
            data: {
                fecha_emision: dto.fecha_emision ? new Date(dto.fecha_emision) : undefined,
                indicaciones: dto.indicaciones,
                id_cita: dto.id_cita,
            },
            include: {
                cita: true,
                medicamentos: {
                    include: { medicamento: true },
                },
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.receta.delete({
            where: { id_receta: id },
        });
    }

    // ✅ Agrega un medicamento a la receta (tabla intermedia RecetaMedica)
    async agregarMedicamento(id_receta: number, dto: AgregarMedicamentoDto) {
        // valida que la receta exista
        await this.findOne(id_receta);

        return this.prisma.recetaMedica.create({
            data: {
                id_receta,
                id_medicamento: dto.id_medicamento,
                dosis: dto.dosis,
                frecuencia: dto.frecuencia,
            },
            include: {
                medicamento: true,
            },
        });
    }
}