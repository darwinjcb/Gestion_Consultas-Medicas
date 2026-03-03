// src/medicamentos/medicamentos.service.ts:
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Injectable()
export class MedicamentosService {
    constructor(private readonly prisma: PrismaService) { }

    create(dto: CreateMedicamentoDto) {
        return this.prisma.medicamento.create({
            data: dto,
        });
    }

    findAll() {
        return this.prisma.medicamento.findMany({
            orderBy: { id_medicamento: 'desc' },
        });
    }

    async findOne(id: number) {
        const medicamento = await this.prisma.medicamento.findUnique({
            where: { id_medicamento: id },
        });

        if (!medicamento)
            throw new NotFoundException('Medicamento no encontrado');

        return medicamento;
    }

    async update(id: number, dto: UpdateMedicamentoDto) {
        await this.findOne(id);

        return this.prisma.medicamento.update({
            where: { id_medicamento: id },
            data: dto,
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.medicamento.delete({
            where: { id_medicamento: id },
        });
    }
}