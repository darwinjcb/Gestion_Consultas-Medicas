// src/medicamentos/medicamentos.controller.ts:
import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Controller('medicamentos')
export class MedicamentosController {
    constructor(private readonly medicamentosService: MedicamentosService) { }

    @Post()
    create(@Body() dto: CreateMedicamentoDto) {
        return this.medicamentosService.create(dto);
    }

    @Get()
    findAll() {
        return this.medicamentosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.medicamentosService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateMedicamentoDto,
    ) {
        return this.medicamentosService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.medicamentosService.remove(id);
    }
}