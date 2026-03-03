// src/recetas/recetas.controller.ts:
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { AgregarMedicamentoDto } from './dto/agregar-medicamento.dto';

@Controller('recetas')
export class RecetasController {
    constructor(private readonly recetasService: RecetasService) { }

    @Post()
    create(@Body() dto: CreateRecetaDto) {
        return this.recetasService.create(dto);
    }

    @Get()
    findAll() {
        return this.recetasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.recetasService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateRecetaDto,
    ) {
        return this.recetasService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.recetasService.remove(id);
    }

    // Agregar medicamento a una receta (tabla intermedia RecetaMedica)
    @Post(':id/medicamentos')
    agregarMedicamento(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: AgregarMedicamentoDto,
    ) {
        return this.recetasService.agregarMedicamento(id, dto);
    }
}