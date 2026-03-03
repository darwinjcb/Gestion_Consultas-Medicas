// src/citas/citas.service.ts:
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { EstadoCita } from '../generated/prisma/enums';

@Injectable()
export class CitasService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateCitaDto) {
        return this.prisma.cita.create({
            data: {
                fecha: new Date(dto.fecha),
                motivo: dto.motivo,
                estado: dto.estado,
                paciente: {
                    connect: { id_paciente: dto.id_paciente },
                },
                doctor: {
                    connect: { id_doctor: dto.id_doctor },
                },
            },
            include: {
                paciente: true,
                doctor: {
                    include: {
                        especialidad: true,
                    },
                },
            },
        });
    }

    findAll() {
        return this.prisma.cita.findMany({
            include: {
                paciente: true,
                doctor: {
                    include: { especialidad: true },
                },
            },
            orderBy: { fecha: 'desc' },
        });
    }

    async findOne(id: number) {
        const cita = await this.prisma.cita.findUnique({
            where: { id_cita: id },
            include: {
                paciente: true,
                doctor: {
                    include: { especialidad: true },
                },
            },
        });

        if (!cita) throw new NotFoundException('Cita no encontrada');

        return cita;
    }

    async update(id: number, dto: UpdateCitaDto) {
        await this.findOne(id);

        return this.prisma.cita.update({
            where: { id_cita: id },
            data: {
                fecha: dto.fecha ? new Date(dto.fecha) : undefined,
                motivo: dto.motivo,
                estado: dto.estado,
                id_paciente: dto.id_paciente,
                id_doctor: dto.id_doctor,
            },
            include: {
                paciente: true,
                doctor: {
                    include: { especialidad: true },
                },
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.cita.delete({
            where: { id_cita: id },
        });
    }

    /* REQUERIMIENTO 6 */
    async actualizarEstadoMasivoPorDia(fechaISO: string, estado: EstadoCita) {
        const inicio = new Date(`${fechaISO}T00:00:00.000Z`);
        const fin = new Date(`${fechaISO}T23:59:59.999Z`);

        return this.prisma.cita.updateMany({
            where: {
                fecha: {
                    gte: inicio,
                    lte: fin,
                },
            },
            data: {
                estado,
            },
        });
    }
}