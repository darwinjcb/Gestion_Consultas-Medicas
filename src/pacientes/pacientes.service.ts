import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacientesService {
    constructor(private readonly prisma: PrismaService) { }

    create(dto: CreatePacienteDto) {
        return this.prisma.paciente.create({
            data: {
                fecha_nacimiento: new Date(dto.fecha_nacimiento),
                nombre: dto.nombre,
                direccion: dto.direccion,
                email: dto.email,
                telefono: dto.telefono,
            },
        });
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
        if (!paciente) throw new NotFoundException('Paciente no encontrado');
        return paciente;
    }

    async update(id: number, dto: UpdatePacienteDto) {
        await this.findOne(id);

        return this.prisma.paciente.update({
            where: { id_paciente: id },
            data: {
                fecha_nacimiento: dto.fecha_nacimiento
                    ? new Date(dto.fecha_nacimiento)
                    : undefined,
                nombre: dto.nombre,
                direccion: dto.direccion,
                email: dto.email,
                telefono: dto.telefono,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.paciente.delete({
            where: { id_paciente: id },
        });
    }
}