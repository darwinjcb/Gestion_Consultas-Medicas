// src/citas/citas.controller.ts:
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
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { UpdateEstadoMasivoDto } from './dto/update-estado-masivo.dto';

@Controller('citas')
export class CitasController {
    constructor(private readonly citasService: CitasService) { }

    @Post()
    create(@Body() dto: CreateCitaDto) {
        return this.citasService.create(dto);
    }

    @Get()
    findAll() {
        return this.citasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.citasService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCitaDto,
    ) {
        return this.citasService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.citasService.remove(id);
    }

    // ✅ REQUERIMIENTO 6
    @Patch('estado/masivo')
    actualizarEstadoMasivo(@Body() dto: UpdateEstadoMasivoDto) {
        return this.citasService.actualizarEstadoMasivoPorDia(dto.fecha, dto.estado);
    }
}