// src/pacientes/pacientes.service.ts:
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class PacientesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreatePacienteDto) {
        try {
            return await this.prisma.paciente.create({
                data: {
                    fecha_nacimiento: new Date(dto.fecha_nacimiento),
                    nombre: dto.nombre,
                    apellido: dto.apellido ?? undefined, // ✅ opcional
                    direccion: dto.direccion,
                    email: dto.email,
                    telefono: dto.telefono,
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException('El email ya está registrado');
            }
            throw error;
        }
    }

    findAll() {
        return this.prisma.paciente.findMany({
            orderBy: { id_paciente: 'desc' },
        });
    }

    async findOne(id: number) {
        const paciente = await this.prisma.paciente.findUnique({
            where: { id_paciente: id },
        });

        if (!paciente) {
            throw new NotFoundException('Paciente no encontrado');
        }

        return paciente;
    }

    async update(id: number, dto: UpdatePacienteDto) {
        await this.findOne(id);

        try {
            return await this.prisma.paciente.update({
                where: { id_paciente: id },
                data: {
                    fecha_nacimiento: dto.fecha_nacimiento
                        ? new Date(dto.fecha_nacimiento)
                        : undefined,
                    nombre: dto.nombre,
                    apellido: dto.apellido ?? undefined, // ✅ opcional
                    direccion: dto.direccion,
                    email: dto.email,
                    telefono: dto.telefono,
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException('El email ya está registrado');
            }
            throw error;
        }
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.paciente.delete({
            where: { id_paciente: id },
        });
    }
}