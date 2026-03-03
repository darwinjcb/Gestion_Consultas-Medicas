import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctoresService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateDoctorDto) {
        return this.prisma.doctor.create({
            data: {
                nombre: dto.nombre,
                telefono: dto.telefono,
                email: dto.email,
                especialidad: {
                    connect: { id_especialidad: dto.id_especialidad },
                },
            },
            include: {
                especialidad: true,
            },
        });
    }

    findAll() {
        return this.prisma.doctor.findMany({
            include: {
                especialidad: true,
            },
            orderBy: { id_doctor: 'desc' },
        });
    }

    async findOne(id: number) {
        const doctor = await this.prisma.doctor.findUnique({
            where: { id_doctor: id },
            include: { especialidad: true },
        });

        if (!doctor) throw new NotFoundException('Doctor no encontrado');

        return doctor;
    }

    async update(id: number, dto: UpdateDoctorDto) {
        await this.findOne(id);

        return this.prisma.doctor.update({
            where: { id_doctor: id },
            data: {
                nombre: dto.nombre,
                telefono: dto.telefono,
                email: dto.email,
                id_especialidad: dto.id_especialidad,
            },
            include: {
                especialidad: true,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.doctor.delete({
            where: { id_doctor: id },
        });
    }
}