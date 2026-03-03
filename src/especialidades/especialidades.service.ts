// src/especialidades/especialidades.service.ts:
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';

@Injectable()
export class EspecialidadesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateEspecialidadDto) {
        return this.prisma.especialidad.create({
            data: {
                nombre: dto.nombre,
            },
        });
    }

    findAll() {
        return this.prisma.especialidad.findMany({
            orderBy: { id_especialidad: 'desc' },
        });
    }

    async findOne(id: number) {
        const especialidad = await this.prisma.especialidad.findUnique({
            where: { id_especialidad: id },
        });

        if (!especialidad)
            throw new NotFoundException('Especialidad no encontrada');

        return especialidad;
    }

    async update(id: number, dto: UpdateEspecialidadDto) {
        await this.findOne(id);

        return this.prisma.especialidad.update({
            where: { id_especialidad: id },
            data: dto,
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.especialidad.delete({
            where: { id_especialidad: id },
        });
    }
}